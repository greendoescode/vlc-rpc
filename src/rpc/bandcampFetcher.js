const ACachingFetcher = require('./aCachingFetcher.js');
const axios = require('axios');

/**
 * Caching fetcher for covers from iTunes
 */
class BandcampFetcher extends ACachingFetcher {
    /**
      * Fetch artwork and join URLs if not cached, otherwise return cached
      * @param {Object} metadata VLC metadata
      * @returns {?{artworkFrom: ?string, artworkUrl: ?string, joinFrom: ?string, joinUrl: ?string}}
      */
    async fetchUncached(metadata) {
        if ((metadata.ALBUMARTIST || metadata.artist) && (metadata.album || metadata.title)) {
            const result = await axios.post(
                "https://bandcamp.com/api/bcsearch_public_api/1/autocomplete_elastic",
                {
                    fan_id: null,
                    full_page: false,
                    search_filter: "",
                    search_text: `${metadata.ALBUMARTIST || metadata.artist} ${metadata.album || metadata.title}`,
                },{
                    headers: {"Accept-Encoding": "gzip,deflate,compress" }
                });
            if (result.data.auto.results.length > 0) {
                let resultItem = result.data.auto.results[0];
                //console.log(resultTrack);
                return {
                    artworkFrom: "Bandcamp",
                    artworkUrl: resultItem.img.replace("/img/", "/img/a"),
                    joinFrom: "Bandcamp",
                    joinUrl: resultItem.item_url_path
                }
            }
        }
    }
}

module.exports = BandcampFetcher;
