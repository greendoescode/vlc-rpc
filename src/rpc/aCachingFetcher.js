

function createKey(metadata) {
    // Create key that can be reasonably expected to be same for all songs in an album
    return JSON.stringify({
        artist: metadata.ALBUMARTIST || metadata.artist,
        album: metadata.album,
        date: metadata.date,
        publisher: metadata.publisher,
    });
}

class ACachingFetcher {
    
    /** @type {!Object} #knownResults [metadataJSON][service] = {{fetchedFrom: string, artworkUrl: string, joinUrl: string}} */
    #knownResults = {};
    
    fetch(metadata) {
        let metadataJSON = createKey(metadata);
        // Use cached results if possible
        if (metadataJSON in this.#knownResults){
            return this.#knownResults[metadataJSON];
        } else {
            return (this.#knownResults[metadataJSON] = this.fetchUncached(metadata));
        }
    }
}

module.exports = ACachingFetcher;
