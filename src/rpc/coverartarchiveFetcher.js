
const ACachingFetcher = require('./aCachingFetcher.js');
const axios = require('axios');

/**
 * Caching fetcher for covers from CoverArtArchive
 */
class CoverArtArchiveFetcher extends ACachingFetcher {
    /**
      * Fetch artwork and join URLs if not cached, otherwise return cached
      * @param {Object} metadata VLC metadata
      * @returns {?{artworkFrom: ?string, artworkUrl: ?string, joinFrom: ?string, joinUrl: ?string}}
      */
    async fetchUncached(metadata) {
        if ((metadata.MUSICBRAINZ_ALBUMID) && metadata.title) {
            const result = await axios.get(
                "https://coverartarchive.org/release/" + metadata.MUSICBRAINZ_ALBUMID,
                {
                    headers: {"Accept-Encoding": "gzip,deflate,compress" }
                });
            if (result.data.images[0] !== undefined){
                return {
                    artworkFrom: "Cover Art Archive",
                    artworkUrl: result.data.images[0].thumbnails.small,
                    joinFrom: "Cover Art Archive",
                    joinUrl: result.data.release
                };
            }
        } else if ((metadata.MB_ALBUMID) && metadata.title) {
            const result = await axios.get(
                "https://coverartarchive.org/release/" + metadata.MB_ALBUMID,
                {
                    headers: {"Accept-Encoding": "gzip,deflate,compress" }
                });
            if (result.data.images[0] !== undefined){
                return {
                    artworkFrom: "Cover Art Archive",
                    artworkUrl: result.data.images[0].thumbnails.small,
                    joinFrom: "Cover Art Archive",
                    joinUrl: result.data.release
                };
            } 
        }
    }
}

module.exports = CoverArtArchiveFetcher;
