/**
 * Description: Decides what information to display based on the nature of the media (video, music, etc)
 */


const fs = require('fs');
const log = require('../helpers/lager.js');
const config = require('../helpers/configLoader.js').getOrInit();
const axios = require('axios');
const albumArt = require('album-art');
const yt = require("ytsr");



// These functions provide uniform inteface for simple access to the APIs
// They take artist album and song as the arguments and return object containing
//   fetchedFrom, artworkUrl and joinUrl (or undefined where not applicable).
const fetchers = {
  "apple": async (artist, album, song) => {
    const params = {
      media: "music",
      term: `${artist} ${song}`,
    };
    const result = await axios.get("https://itunes.apple.com/search", {
      params,
    });
    if (result.data.resultCount == 0 || result.data.results[0] === undefined)
    {
      return {
        fetchedFrom: undefined,
        artworkUrl: undefined,
        joinUrl: undefined
      };
    }
    else
    {
      return {
        fetchedFrom: "Apple Music",
        artworkUrl: result.data.results[0].artworkUrl100,
        joinUrl: result.data.results[0].trackViewUrl
      };
    }
  },
  "spotify": async (artist, album, song) => {
    let result = await albumArt(artist, {album}).then((data) => data);
    // TODO: how is failure indicated in the albumArt library?
    return {
      fetchedFrom: "Spotify",
      artworkUrl: result,
      joinUrl: undefined
    };
  },
  "youtube": async (artist, album, song) => {
    // This just crashes most of the time, no clue why
    const result = await yt(encodeURI(`${artist} ${song}`), { limit: 1 });
    if (result.items.length == 0)
    {
      return {
        fetchedFrom: undefined,
        artworkUrl: undefined,
        joinUrl: undefined
      };
    }
    else
    {
      return {
        fetchedFrom: "Youtube",
        artworkUrl: undefined,
        joinUrl: result.items[0].url
      };
    }
  }
}


module.exports = async (status) => {
  // if playback is stopped
  if (status.state === 'stopped') {
    return {
      state: 'Stopped',
      details: 'Nothing is playing',
      largeImageKey: config.rpc.largeIcon,
      smallImageKey: 'stopped',
      instance: true,
    }; 
  } // else
  const { meta } = status.information.category;


  // Find correct artist name to display,
  //  then append one character since Discord^{citation needed} doesn't like
  //  when it's only one character.
  let display_artist = undefined;
  if (meta.albumartist)
  {
    display_artist = meta.albumartist + " ";
  }
  else if (meta.artist)
  {
    display_artist = meta.artist + " ";
  }

  // Fetch artwork and join URLs
  let artwork, fetched, joinUrl, joinLabel;

  if (meta.title !== undefined && display_artist !== undefined)
  {
    // Initial fetch for artwork
    const fetchResult1 = await fetchers[config.rpc.whereToFetchOnline](display_artist, meta.album, meta.title);
    if(fetchResult1.artworkUrl != undefined)
    {
      artwork = fetchResult1.artworkUrl;
      fetched = fetchResult1.fetchedFrom;
    }
    else
    {
      artwork = config.rpc.largeIcon;
      fetched = "Nowhere";
    }

    // If desired artwork and join URL providers are the same,
    //  use existing fetch, otherwise fetch the join URL
    if (config.rpc.whereToFetchOnline === config.rpc.changeButtonProvider)
    {
      if (fetchResult1.joinUrl)
      {
        joinUrl = fetchResult1.joinUrl;
        joinLabel = `Listen on ${fetchResult1.fetchedFrom}`;
      }
    }
    else
    {
      const fetchResult2 = await fetchers[config.rpc.changeButtonProvider](display_artist, meta.album, meta.title);
      if(fetchResult2.joinUrl)
      {
        joinUrl = fetchResult2.joinUrl;
        joinLabel = `Listen on ${fetchResult2.fetchedFrom}`;
      }
    }
  }
  else
  {
    artwork = config.rpc.largeIcon;
    fetched = "Nowhere";
  }

  if (config.debug === 'true') {
    console.log(artwork);
    console.log(status.state);
    console.log(fetched);
    console.log(meta.title);
    console.log(meta.artist, artist);
    console.log(display_artist)
    console.log(meta.albumartist)
    console.log(status.stats.decodedvideo)
  }

  // Large image hover text
  let largeImageTextIs;
  if (config.rpc.largeImageText === "artist"){
    largeImageTextIs = decodeURI(artist);
  } else if (config.rpc.largeImageText === "album") {
    largeImageTextIs = meta.album;
  } else if (config.rpc.largeImageText === "volume") {
    largeImageTextIs = `Volume: ${Math.round(status.volume / 2.56)}%`;
  } else if (config.rpc.largeImageText === "title") {
    largeImageTextIs = meta.title;
  } else if (config.rpc.largeImageText === "fetched") {
    largeImageTextIs = `Artwork fetched from ${fetched}`;
  }

  output = {
    // Shows file thats playing.. well most of the time
    details: meta.title || meta.filename || "Playing something..",
    largeImageText: largeImageTextIs,
    // Sets album art depending on whats set in the file, or if album art cannot be found
    largeImageKey: artwork || "https://i.pinimg.com/originals/67/f6/cb/67f6cb14f862297e3c145014cdd6b635.jpg",
    smallImageKey: status.state,
    smallImageText: `Volume: ${Math.round(status.volume / 2.56)}%`,
    instance: true,
  };
  
  if (joinUrl && joinLabel)
  {
    output.buttons = [
      {
        label: joinLabel,
        url: joinUrl
      }
    ];
  }
  
  // if video
  if(status.stats.decodedvideo > 0) {
    // if youtube video
    if (meta['YouTube Start Time'] !== undefined) {
      output.largeImageKey = 'youtube';
      output.largeImageText = meta.url;
    }
    // if a tv show
    if (meta.showName) output.details = meta.showName;
    if (meta.episodeNumber) {
      output.state = `Episode ${meta.episodeNumber}`;
      if (meta.seasonNumber) {
        output.state += ` - Season ${meta.seasonNumber}`;
      }
    } else if (display_artist) {
      output.state = display_artist;
    } else {
      output.state = `${(status.date || '')} Video`;
    }
  } else if (meta.now_playing) {
    // if a stream
    output.state = meta.now_playing || "Stream";
  } else if (display_artist) {
    // Add artist to the state
    output.state = display_artist;

    // Add album to the state if possible
    if (meta.album)
      output.state += ` - ${meta.album}`;

    //Trim the state if too longdisplay_artist
    if (output.state.length > 128)
    {
      console.warn("The string ('" + output.state + "') is too long for discord :/");
      output.state = output.state.substring(0, 128);
    }

    // display track #
    if (meta.track_number && meta.track_total && config.rpc.displayTrackNumber) {
      output.partySize = parseInt(meta.track_number, 10);
      output.partyMax = parseInt(meta.track_total, 10);
    }
  } else {
    output.state = status.state;
  }
  const end = Math.floor(Date.now() / 1000 + ((status.length - status.time) / status.rate));
  if (status.state === 'playing' && config.rpc.displayTimeRemaining && status.length != 0) {
    output.endTimestamp = end;
  }
  log('Format output', output);
  return output;
};