
const ACachingFetcher = require('./aCachingFetcher.js');
const axios = require('axios');

/**
 * Caching fetcher for covers from iTunes
 */
class AppleFetcher extends ACachingFetcher {
    /**
      * Fetch artwork and join URLs if not cached, otherwise return cached
      * @param {Object} metadata VLC metadata
      * @returns {?{artworkFrom: ?string, artworkUrl: ?string, joinFrom: ?string, joinUrl: ?string}}
      */
    async fetchUncached(metadata) {
        if ((metadata.ALBUMARTIST || metadata.artist) && metadata.title) {
            const result = await axios.get(
                "https://itunes.apple.com/search",
                {
                    params: {
                        media: "music",
                        term: `${metadata.ALBUMARTIST || metadata.artist} ${metadata.title}`,
                    },
                    headers: {"Accept-Encoding": "gzip,deflate,compress" }
                });
            if (result.data.resultCount > 0 && result.data.results[0] !== undefined) {
                return {
                  artworkFrom: "Apple Music",
                  artworkUrl: result.data.results[0].artworkUrl100,
                  joinFrom: "Apple Music",
                  joinUrl: result.data.results[0].trackViewUrl
                };
            }
        }
    }
}

module.exports = AppleFetcher;
