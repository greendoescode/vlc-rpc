/**
 * Description: Decides what information to display based on the nature of the media (video, music, etc)
 */


const fs = require('fs');
const log = require('../helpers/lager.js');
const config = require('../helpers/configLoader.js').getOrInit();
const axios = require('axios');
const yt = require("ytsr");
const path = require("path")

let musichoardersFetcher = new (require('./musichoardersFetcher.js'))(config.rpc.persistentMusicHoardersCache);

// These functions, 'fetchers', provide uniform inteface for simple access to the APIs
// They take VLC metadata as the argument and on success return object containing
//   fetchedFrom, artworkUrl and joinUrl (or undefined where not applicable).
// In order to be as simple as possible, the functions may throw exceptions or not return anything.
//   They are expected to be called through the `fetchSafely()` wrapper.
const fetchers = {
  "apple": async (metadata) => { // Doesn't rely on MusicHoarders, keep it that way, just in case
    if ((metadata.ALBUMARTIST || metadata.artist) && metadata.title)
    {
      const result = await axios.get("https://itunes.apple.com/search", {
        params: {
          media: "music",
          term: `${metadata.ALBUMARTIST || metadata.artist} ${metadata.title}`,
        },
        headers: {"Accept-Encoding": "gzip,deflate,compress" }
      });
      if (result.data.resultCount > 0 && result.data.results[0] !== undefined)
      {
        return {
          fetchedFrom: "Apple Music",
          artworkUrl: result.data.results[0].artworkUrl100,
          joinUrl: result.data.results[0].trackViewUrl
        };
      }
    }
  },
  "bandcamp": async (metadata) => {
    return musichoardersFetcher.fetch("bandcamp", metadata);
  },
  "deezer": async (metadata) => {
    return musichoardersFetcher.fetch("deezer", metadata);
  },
  "musichoarders": async (metadata) => {
    return musichoardersFetcher.fetch("musichoarders", metadata);
  },
  "qobuz": async (metadata) => {
    return musichoardersFetcher.fetch("qobuz", metadata);
  },
  "spotify": async (metadata) => {
    return musichoardersFetcher.fetch("spotify", metadata);
  },
  "soundcloud": async (metadata) => {
    return musichoardersFetcher.fetch("soundcloud", metadata);
  },
  "tidal": async (metadata) => {
    return musichoardersFetcher.fetch("tidal", metadata);
  },
  "youtube": async (metadata) => {
    const result = await yt(`${metadata.ALBUMARTIST || metadata.artist || ""} ${metadata.title || metadata.filename}`.trim(), { limit: 1 });
    if (result.items.length > 0)
    {
      return {
        fetchedFrom: "Youtube",
        artworkUrl: undefined,
        joinUrl: result.items[0].url
      };
    }
  }
}

/**
 * Safe wrapper for calling a fetcher in try-catch block
 * @param {string} fetcherName name of the fetcher to use
 * @param {Object} metadata    VLC metadata
 * @returns {!{fetchedFrom: string, artworkUrl: string, joinUrl: string}}
 */
async function fetchSafely(fetcherName, metadata)
{
  let returnValue;
  try
  {
    returnValue = await fetchers[fetcherName](metadata);
  }
  catch (err)
  {
    console.log(err);
  }
  finally
  {
    return (returnValue ? returnValue : {});
  }
}

/**
 * Fetches both artwork URL and join URL if possible
 * @param {string} preferredArtworkProvider name of preferred artwork fetcher
 * @param {string} preferredJoinProvider    name of preferred join fetcher
 * @param {Object} metadata                 VLC metadata
 * @returns {!{artworkUrl: string, artworkFrom: string, joinUrl: string, joinFrom: string}}
 */
async function combinedFetch(preferredArtworkProvider, preferredJoinProvider, metadata)
{
  let artworkUrl, artworkFrom, joinUrl, joinFrom;
  let results = [];

  // First try fetching artwork URL using preferred provider
  results[preferredArtworkProvider] = await fetchSafely(preferredArtworkProvider, metadata);
  if(results[preferredArtworkProvider].artworkUrl)
  {
    artworkUrl = results[preferredArtworkProvider].artworkUrl;
    artworkFrom = results[preferredArtworkProvider].fetchedFrom;
  }

  // Next try fetching join URL from preferred provider
  if (preferredArtworkProvider !== preferredJoinProvider)
  {
    results[preferredJoinProvider] = await fetchSafely(preferredJoinProvider, metadata);
  }
  // Set it separately, in case both preferred providers are the same
  if (results[preferredJoinProvider].joinUrl)
  {
    joinUrl = results[preferredJoinProvider].joinUrl;
    joinFrom = results[preferredJoinProvider].fetchedFrom;
  }

  // Try using preferred join provider as a backup artwork provider and vice versa
  if (!artworkUrl && results[preferredJoinProvider].artworkUrl)
  {
    artworkUrl = results[preferredJoinProvider].artworkUrl;
    artworkFrom = results[preferredJoinProvider].fetchedFrom;
  }
  if (!joinUrl && results[preferredArtworkProvider].joinUrl)
  {
    joinUrl = results[preferredArtworkProvider].joinUrl;
    joinFrom = results[preferredArtworkProvider].fetchedFrom;
  }

  // In case either still isn't set, iterate all other providers
  let availableProviderNames = Object.keys(fetchers);
  for (let ii = 0; (!artworkUrl || !joinUrl) && ii < availableProviderNames.length; ++ii)
  {
    if (!(availableProviderNames[ii] in results))
    {
      results[availableProviderNames[ii]] = await fetchSafely(availableProviderNames[ii], metadata);
      if(!artworkUrl && results[availableProviderNames[ii]].artworkUrl)
      {
        artworkUrl = results[availableProviderNames[ii]].artworkUrl;
        artworkFrom = results[availableProviderNames[ii]].fetchedFrom;
      }
      if (!joinUrl && results[availableProviderNames[ii]].joinUrl)
      {
        joinUrl = results[availableProviderNames[ii]].joinUrl;
        joinFrom = results[availableProviderNames[ii]].fetchedFrom;
      }
    }
  }

  // Return selected results
  return {artworkUrl, artworkFrom, joinUrl, joinFrom};
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

  // Fetch artwork and join URLs
  let artwork = config.rpc.largeIcon, fetched = "Nowhere", joinUrl, joinLabel;
  {
    const fetchResult
      = await combinedFetch(config.rpc.whereToFetchOnline, config.rpc.changeButtonProvider, meta);

    // Use artwork URL if present
    if(fetchResult.artworkUrl)
    {
      artwork = fetchResult.artworkUrl;
      fetched = fetchResult.artworkFrom;
    }

    // Use join URL if present
    if (fetchResult.joinUrl)
    {
      joinUrl = fetchResult.joinUrl;
      joinLabel = `Listen on ${fetchResult.joinFrom}`;
    }
  }

  if (config.debug === 'true') {
    console.log('Cache loaded from file.');
    console.log(artwork);
    console.log(status.state);
    console.log(fetched);
    console.log(meta);
    console.log(status.stats.decodedvideo);
  }

  // Find the correct artist name to display
  let display_artist = meta.artist || meta.ALBUMARTIST || undefined;

  // Large and small image hover texts
  let hoverTexts = [config.rpc.largeImageText, config.rpc.smallImageText].map(
    (opt) => {
      if (opt === "artist")
      {
        return display_artist;
      }
      else if (opt === "album")
      {
        return meta.album;
      }
      else if (opt === "volume")
      {
        return `Volume: ${Math.round(status.volume / 2.56)}%`;
      }
      else if (opt === "title")
      {
        return meta.title;
      }
      else if (opt === "fetched")
      {
        return `Artwork fetched from ${fetched}`;
      }
      else
      {
        return undefined;
      }
    } // Fit the hover text to Discord supported range [2, 128]
  ).map(e => e ? (e + " ").substring(0, 128) : e);

  let output = {
    // Shows file thats playing.. well most of the time
    details: meta.title || meta.filename || "Playing something..",
    largeImageText: hoverTexts[0] || config.rpc.largeImageText,
    // Sets album art depending on whats set in the file, or if album art cannot be found
    largeImageKey: artwork || "https://i.pinimg.com/originals/67/f6/cb/67f6cb14f862297e3c145014cdd6b635.jpg",
    smallImageKey: status.state,
    smallImageText: hoverTexts[1] || `Volume: ${Math.round(status.volume / 2.56)}%`,
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

  if(status.stats.decodedvideo > 0)
  { // if video
    if (meta['YouTube Start Time'] !== undefined)
    { // if youtube video
      output.largeImageKey = 'youtube';
      output.largeImageText = meta.url;
    }
    if (meta.showName)
    { // if a tv show
      output.details = meta.showName;
    }
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
  }
  else if (meta.now_playing)
  { // if a stream
    output.state = meta.now_playing || "Stream";
  }
  else if (display_artist)
  { // if a song

    // Add artist to the state
    output.state = display_artist;

    // Add album to the state if possible
    if (meta.album)
      output.state += ` - ${meta.album}`;

    // Display track number
    if (meta.track_number && meta.track_total && config.rpc.displayTrackNumber)
    {
      output.partySize = parseInt(meta.track_number, 10);
      output.partyMax = parseInt(meta.track_total, 10);
    }
  }
  else
  {
    output.state = status.state;
  }

  // Fit the status text to Discord supported range [2, 128]
  output.state = (output.state + " ").substring(0, 128);

  const end = Math.floor(Date.now() / 1000 + ((status.length - status.time) / status.rate));
  if (status.state === 'playing' && config.rpc.displayTimeRemaining && status.length != 0) {
    output.endTimestamp = end;
  }
  log('Format output', output);
  return output;
};