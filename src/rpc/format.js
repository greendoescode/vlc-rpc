/**
 * Description: Decides what information to display based on the nature of the media (video, music, etc)
 */


const fs = require('fs')
const log = require('../helpers/lager.js');
const config = require('../../config/config.js');
const axios = require('axios')
const albumArt = require('album-art');
const yt = require("ytsr")


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


  
  const fetchArtworkApple = async (searchQuery) => {
    const params = {
      media: "music",
      term: searchQuery,
    };
    return axios.get("https://itunes.apple.com/search", {
      params,
    });
  };

  const artist =  String(encodeURIComponent(meta.artist));
  const options = {
    album: String(encodeURIComponent(meta.album))
  }

  var appleresponse = await fetchArtworkApple(`${meta.title} ${meta.artist}`);
  
  if (config.rpc.whereToFetchOnline === 'apple') {
    var artwork = appleresponse.data.results[0].artworkUrl100;
    var fetched = "Apple";
  } else {
    var artwork = await albumArt(artist, options).then((data) => data);
    var fetched = "Spotify"  
  }


  
  if (config.debug === 'true') {
    console.log(artwork),
    console.log(status.state),
    console.log(fetched),
    console.log(meta.title),
    console.log(meta.artist)
  }

  if (artwork === undefined){
    console.error(`Couldn't find artwork using ${config.rpc.whereToFetchOnline}! Try switching providers`);    
    var fetched = "Nowhere";
  }

  if(config.rpc.changeButtonProvider === "youtube"){
    var enableYoutubeButton = "true"
  } 

  if (meta.artist === undefined){
    var artwork = config.rpc.largeIcon
    var fetched = "Nowhere"
    var enableYoutubeButton = "true"
  } else if (meta.title === undefined) {
    var artwork = config.rpc.largeIcon
    var fetched = "Nowhere"
    var enableYoutubeButton = "true"
  }

  if (config.rpc.largeImageText === "artist"){
    var largeImageTextIs = meta.artist
  } else if (config.rpc.largeImageText === "album") {
    var largeImageTextIs = meta.album
  } else if (config.rpc.largeImageText === "volume") {
    var largeImageTextIs = `Volume: ${Math.round(status.volume / 2.56)}%`
  } else if (config.rpc.largeImageText === "title") {
    var largeImageTextIs = meta.title
  } else if (config.rpc.largeImageText === "fetched") {
    var largeImageTextIs = `Artwork fetched from ${fetched}`
  }
  

  if(enableYoutubeButton){
    if (meta.title === undefined) {
      const search = await yt(`${meta.filename}`, { limit: 1 })
      const resultunjson = JSON.stringify(search.items)
      const result = JSON.parse(resultunjson)
      var url = result[0].url
      var label = "Listen on Youtube" 
    } else if (meta.artist === undefined) {
      const search = await yt(`${meta.filename}`, { limit: 1 })
      const resultunjson = JSON.stringify(search.items)
      const result = JSON.parse(resultunjson)
      var url = result[0].url
      var label = "Listen on Youtube" 
    } else {
      const search = await yt(`${meta.title} ${meta.artist}`, { limit: 1 })
      const resultunjson = JSON.stringify(search.items)
      const result = JSON.parse(resultunjson)
      var url = result[0].url
      var label = "Listen on Youtube" 
    }
    

  } else {
    var url = appleresponse.data.results[0].trackViewUrl
    var label = "Listen on Apple Music"
  }
  



  const output = {
    
    details: meta.title || meta.filename || "Playing something..",
    largeImageText: largeImageTextIs,
    largeImageKey: artwork || "https://i.pinimg.com/originals/67/f6/cb/67f6cb14f862297e3c145014cdd6b635.jpg",
    smallImageKey: status.state,
    smallImageText: `Volume: ${Math.round(status.volume / 2.56)}%`,
    instance: true,
    buttons: [
        {
          label: label,
          url: url,
        },
      ]
  };
  // if video
  if (status.stats.decodedvideo > 0) { 
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
    } else if (meta.artist) {
      output.state = meta.artist;
    } else {
      output.state = `${(status.date || '')} Video`;
    }
  } else if (meta.now_playing) {
    // if a stream
    output.state = meta.now_playing || "Stream";
  } else if (meta.artist) {
    // if in an album
    output.state = meta.artist;
    // if the song is part of an album
    if (meta.album) output.state += ` - ${meta.album}`;
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
