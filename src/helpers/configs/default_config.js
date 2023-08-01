module.exports = {

  // Version of the config file
  configFileVersion: "1.2",

  // The full path to your VLC executable
  // If left blank, typical defaults are used
  vlcPath: "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe",

  debug : "false",


  console: {
    // Sets the "Presence Updated" text to off or on
    presencestate : false,
    
    // Sets the console to Task icon mode (wip)
    taskicon : false,

    // Sets it to show whats now playing
    nowplaying : true

  },

  rpc: {
    
    // Set the hover text for the images, accepts "title", "artist", "album", "volume" and "fetched".
    largeImageText: "fetched",
    smallImageText: "volume",

    // The Discord application ID for the rich presence
    id: '1032293686098272316',

    // How frequently in milliseconds to check for updates
    updateInterval: 1000,

    // Preferred provider of the album artwork. Supported values
    //   "staticcverrides" (for values from `config/staticoverrides.js`)
    //   "musichoarders" (for closest fit from servicese below)
    //   "apple", "bandcamp", "deezer", "qobuz", "spotify", "soundcloud" and "tidal"
    whereToFetchOnline: "staticoverrides",

    // Preferred provider of the rpc button (as above + "youtube")
    changeButtonProvider: "staticoverrides",

    // Whether to use persistent cache for MusicHoarders queries
    persistentMusicHoardersCache: false,

    // When playback is paused, wait this many milliseconds 
    // before removing your rich presence
    sleepTime: 30000,

    // Show the album track number when applicable. Example: (2 of 10)
    displayTrackNumber: true,

    // Show the remaining playback time
    displayTimeRemaining: true,

    // Keep rich presence when playback is stopped 
    showStopped: true,

    // If true, VLC will not be opened for you.
    // Note: You must set a password, go to info/advanced.md for instructions.
    detached: false,

    // Changes the big icon of the rich presence
    // Some of the available icons are: vlc, vlcflat, vlcblue, vlcneon, vlcxmas
    largeIcon: "vlc",

  },

  vlc: {

    // If no password is given, a random password is used
    password: 'passwordgoeshere',

    // This must correspond with the port VLC's web interface uses
    port: 8080,

    // Hostname of the VLC web interface. Nobody should need to change this
    address: 'localhost'

  },
};