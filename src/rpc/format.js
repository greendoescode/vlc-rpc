/**
 * Description: Decides what information to display based on the nature of the media (video, music, etc)
 */

const fs = require("fs");
const log = require("../helpers/lager.js");
const cl = require("../helpers/configLoader.js");
const config = cl.getOrInit("config.js");
const axios = require("axios");
const { debug } = require("console");

let staticOverridesFetcher = new (require("./staticOverridesFetcher.js"))(
  cl.getOrInit("staticoverrides.js")
);
let appleFetcher = new (require("./appleFetcher.js"))();
let bandcampFetcher = new (require("./bandcampFetcher.js"))();
let coverartarchiveFetcher = new (require("./coverartarchiveFetcher.js"))();
let songTitle = null;
let selectedStream = null;

// These functions, 'fetchers', provide uniform inteface for simple access to the APIs
// They take VLC metadata as the argument and on success return object containing
//   fetchedFrom, artworkUrl and joinUrl (or undefined where not applicable).
// In order to be as simple as possible, the functions may throw exceptions or not return anything.
//   They are expected to be called through the `fetchSafely()` wrapper.
const fetchers = {
  staticoverrides: (md) => staticOverridesFetcher.fetch(md),
  apple: (md) => appleFetcher.fetch(md),
  bandcamp: (md) => bandcampFetcher.fetch(md),
  coverartarchive: (md) => coverartarchiveFetcher.fetch(md),
};

/**
 * Safe wrapper for calling a fetcher in try-catch block
 * @param {string} fetcherName name of the fetcher to use
 * @param {Object} metadata    VLC metadata
 * @returns {!{artworkFrom: ?string, artworkUrl: ?string, joinFrom: ?string, joinUrl: ?string}}
 */
async function fetchSafely(fetcherName, metadata) {
  let returnValue;
  try {
    returnValue = await fetchers[fetcherName](metadata);
  } catch (err) {
    console.log(err);
  } finally {
    return returnValue ? returnValue : {};
  }
}

/**
 * Fetches both artwork URL and join URL if possible
 * @param {string} preferredArtworkProvider name of preferred artwork fetcher
 * @param {string} preferredJoinProvider    name of preferred join fetcher
 * @param {Object} metadata                 VLC metadata
 * @returns {!{artworkFrom: ?string, artworkUrl: ?string, joinFrom: ?string, joinUrl: ?string}}
 */
async function combinedFetch(
  preferredArtworkProvider,
  preferredJoinProvider,
  metadata
) {
  let artworkFrom, artworkUrl, joinFrom, joinUrl;
  let results = [];

  // First try fetching artwork URL using preferred provider
  results[preferredArtworkProvider] = await fetchSafely(
    preferredArtworkProvider,
    metadata
  );
  if (results[preferredArtworkProvider].artworkUrl) {
    artworkFrom = results[preferredArtworkProvider].artworkFrom;
    artworkUrl = results[preferredArtworkProvider].artworkUrl;
  }

  // Next try fetching join URL from preferred provider
  if (preferredArtworkProvider !== preferredJoinProvider) {
    results[preferredJoinProvider] = await fetchSafely(
      preferredJoinProvider,
      metadata
    );
  }
  // Set it separately, in case both preferred providers are the same
  if (results[preferredJoinProvider].joinUrl) {
    joinFrom = results[preferredJoinProvider].joinFrom;
    joinUrl = results[preferredJoinProvider].joinUrl;
  }

  // Try using preferred join provider as a backup artwork provider and vice versa
  if (!artworkUrl && results[preferredJoinProvider].artworkUrl) {
    artworkFrom = results[preferredJoinProvider].artworkFrom;
    artworkUrl = results[preferredJoinProvider].artworkUrl;
  }
  if (!joinUrl && results[preferredArtworkProvider].joinUrl) {
    joinFrom = results[preferredArtworkProvider].joinFrom;
    joinUrl = results[preferredArtworkProvider].joinUrl;
  }

  // In case either still isn't set, iterate all other providers
  let availableProviderNames = Object.keys(fetchers);
  for (
    let ii = 0;
    (!artworkUrl || !joinUrl) && ii < availableProviderNames.length;
    ++ii
  ) {
    if (!(availableProviderNames[ii] in results)) {
      results[availableProviderNames[ii]] = await fetchSafely(
        availableProviderNames[ii],
        metadata
      );
      if (!artworkUrl && results[availableProviderNames[ii]].artworkUrl) {
        artworkFrom = results[availableProviderNames[ii]].artworkFrom;
        artworkUrl = results[availableProviderNames[ii]].artworkUrl;
      }
      if (!joinUrl && results[availableProviderNames[ii]].joinUrl) {
        joinFrom = results[availableProviderNames[ii]].joinFrom;
        joinUrl = results[availableProviderNames[ii]].joinUrl;
      }
    }
  }

  // Return selected results
  return { artworkUrl, artworkFrom, joinUrl, joinFrom };
}

module.exports = async (status) => {
  // if playback is stopped
  if (status.state === "stopped") {
    return {
      state: "Stopped",
      details: "Nothing is playing",
      largeImageKey: config.rpc.largeIcon,
      smallImageKey: "stopped",
      instance: true,
    };
  } // else

  const { meta } = status.information.category;

  // Select VLC stream to fetch track information (wip for attatched mode)
  if (config.rpc.detached) {
    const streams = Object.values(status.information.category);

    // Find the first audio stream
    selectedStream = streams.find((stream) => stream.Type === "Audio") ?? null;
  }

  // Fetch artwork and join URLs
  let artwork = config.rpc.largeIcon,
    fetched = "Nowhere",
    joinUrl,
    joinLabel;
  {
    const fetchResult = await combinedFetch(
      config.rpc.whereToFetchOnline,
      config.rpc.changeButtonProvider,
      meta
    );

    // Use artwork URL if present
    if (fetchResult.artworkUrl) {
      artwork = fetchResult.artworkUrl;
      fetched = fetchResult.artworkFrom;
    }

    // Use join URL if present
    if (fetchResult.joinUrl) {
      joinUrl = fetchResult.joinUrl;
      if (fetchResult.joinFrom == "Cover Art Archive") {
        joinLabel = `Album Info - ${fetchResult.joinFrom}`;
      } else {
        joinLabel = `Listen on ${fetchResult.joinFrom}`;
      }
    }
  }

  if (config.debug === "true") {
    console.log("Cache loaded from file.");
    console.log(artwork);
    console.log(status.state);
    console.log(fetched);
    console.log(meta);
    console.log(songTitle);
    console.log(status.stats.decodedvideo);
  }

  // Find the correct artist name to display
  let display_artist = meta.artist || meta.ALBUMARTIST || undefined;

  // Large and small image hover texts
  let hoverTexts = [config.rpc.largeImageText, config.rpc.smallImageText].map(
    (opt) => {
      if (opt === "artist") {
        return display_artist;
      } else if (opt === "album") {
        return meta.album;
      } else if (opt === "volume") {
        return `Volume: ${Math.round(status.volume / 2.56)}%`;
      } else if (opt === "title") {
        return meta.title;
      } else if (opt === "fetched") {
        return `Artwork fetched from ${fetched}`;
      } else {
        return undefined;
      }
    }
  );

  // Format songTitle for Bit rate and Sample Rate
  if (config.rpc.enableSampleRate && selectedStream) {
    songTitle = `${meta.title || meta.filename || "Playing something.."} [${
      selectedStream["Bits_per_sample"]
    } Bits, ${selectedStream["Sample_rate"].slice(0, 2)}kHz]`;
  } else {
    songTitle = meta.title || meta.filename || "Playing something..";
  }

  let output = {
    type: 2,
    details: songTitle,
    // Sets album art depending on whats set in the file, or if album art cannot be found
    largeImageKey:
      artwork ||
      "https://i.pinimg.com/originals/67/f6/cb/67f6cb14f862297e3c145014cdd6b635.jpg",
    largeImageText: hoverTexts[0] || config.rpc.largeImageText,
    smallImageKey: status.state,
    smallImageText:
      hoverTexts[1] || `Volume: ${Math.round(status.volume / 2.56)}%`,
    instance: true,
    buttons:
      joinUrl && joinLabel
        ? [
            {
              label: joinLabel,
              url: joinUrl,
            },
          ]
        : undefined,
  };

  if (status.stats.decodedvideo > 0) {
    // if video
    output.type = 3;
    if (meta["YouTube Start Time"] !== undefined) {
      // if youtube video
      output.largeImageKey = "youtube";
      output.largeImageText = meta.url;
    }
    if (meta.showName) {
      // if a tv show
      output.details = meta.showName;
    }
    if (meta.episodeNumber) {
      output.state = `Episode ${meta.episodeNumber}`;
      if (meta.seasonNumber && config.rpc.seasonnumber) {
        output.state += ` - Season ${meta.seasonNumber}`;
      }
    } else if (display_artist) {
      output.state = display_artist;
    } else {
      output.state = `${status.date || ""} Video`;
    }
  } else if (meta.now_playing) {
    // if a stream
    output.type = 2;
    output.state = meta.now_playing || "Stream";
  } else if (display_artist) {
    // if a song
    output.type = 2;
    // Add artist to the state
    output.state = display_artist;

    // Add album to the state if possible
    if (meta.album) output.state += ` - ${meta.album}`;

    // Display track number
    if (
      meta.track_number &&
      meta.track_total &&
      config.rpc.displayTrackNumber
    ) {
      output.partySize = parseInt(meta.track_number, 10);
      output.partyMax = parseInt(meta.track_total, 10);
    }
  } else {
    output.state = status.state;
  }

  // Fit the details, status, image texts to Discord supported range [2, 128]
  output.details = (output.details + "  ").substring(0, 128);
  output.state = (output.state + "  ").substring(0, 128);
  output.largeImageText = (output.largeImageText + "  ").substring(0, 128);
  output.smallImageText = (output.smallImageText + "  ").substring(0, 128);

  if (
    status.state === "playing" &&
    config.rpc.displayTimeRemaining &&
    status.length != 0
  ) {
    const now = new Date().valueOf();
    output.startTimestamp = Math.round(now - status.time * 1000);
    output.endTimestamp = Math.round(
      now + (status.length - status.time) * 1000
    );
  }
  log("Format output", output);
  return output;
};
