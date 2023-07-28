
const axios = require('axios');
const levenshtein = require("js-levenshtein");

class MusicHoardersFetcher
{
  static #services = {
    "spotify": "Spotify",
    "qobuz": "Qobuz",
    "deezer": "Deezer"
  };
  static #apiUrl = "https://covers.musichoarders.xyz/api/search";

  #lastMetadata;
  #lastResults = {};

  constructor(){}

  /**
   * Fetch artwork and join URLs if not cached, otherwise return cached
   * @param {string} service  service name, e.g. "spotify"
   * @param {Object} metadata VLC metadata
   * @returns {?{fetchedFrom: string, artworkUrl: string, joinUrl: string}}
   */
  async fetch(service, metadata)
  {
    if ((metadata.albumartist || metadata.artist) && metadata.album) {
      let metadataJSON = JSON.stringify(metadata);
      if (metadataJSON === this.#lastMetadata)
      { // Use cached results if possible
        return this.#lastResults[service];
      }
      else
      { // Otherwise make a new request
        const data = {
          artist: metadata.albumartist || metadata.artist,
          album: metadata.album,
          country: "gb", // this can be static
          sources: Object.keys(MusicHoardersFetcher.#services)
        };

        const response = await axios.post(MusicHoardersFetcher.#apiUrl,
                                          data, { headers: { 'User-Agent':'VLC-RPC V1.2' }});
        const albumsData = response.data.split("\n").map((line) => {
          try {
            if (line.trim().length > 0) {
              return JSON.parse(line);
            }
            return null;
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        });

        let bestResults = {};
        albumsData.forEach((album) => {
          if (album && album.releaseInfo && album.releaseInfo.artist) {
            const albumNameScore =
              levenshtein(metadata.album.toLowerCase(), album.releaseInfo.title.toLowerCase());

            if (!bestResults[album.source] || bestResults[album.source].score > albumNameScore) {
              bestResults[album.source] = { album, score: albumNameScore };
            }
          }
        });

        for (let serviceKey in bestResults)
        {
          this.#lastResults[serviceKey] = {
            fetchedFrom: MusicHoardersFetcher.#services[serviceKey],
            artworkUrl: bestResults[serviceKey].album.bigCoverUrl,
            joinUrl: bestResults[serviceKey].album.releaseInfo.url,
          };
        };
        //console.log(this.#lastResults);

        this.#lastMetadata = metadataJSON;
        return this.#lastResults[service];
      }
    }
  }
}

module.exports = MusicHoardersFetcher;
