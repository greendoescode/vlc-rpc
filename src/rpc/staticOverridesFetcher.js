
/**
 * Fetcher of static overrides
 */
class StaticOverridesFetcher
{
  /** @type {!Object} #data structure for storing the lookup data */
  #data = {};

  constructor(rawData)
  {
    for (let v of rawData)
    {
      // Use key stringified with sorted keys
      this.#data[JSON.stringify(v.key, Object.keys(v.key).sort())] = v.value;
    }
  }

  /**
   * @param {!Object} VLC metadata
   * @returns {!{artworkFrom: ?string, artworkUrl: ?string, joinFrom: ?string, joinUrl: ?string}}
   */
  fetch(metadata)
  {
    let result = {};

    for (let v of StaticOverridesFetcher.createPowerset(metadata.ALBUMARTIST || metadata.artist,
                                                        metadata.album))
    {
      let lookup_result = this.#data[JSON.stringify(v)];

      if (lookup_result)
      {
        if (!result.artworkUrl && lookup_result.artworkUrl)
        {
          result.artworkFrom = lookup_result.artworkFrom;
          result.artworkUrl = lookup_result.artworkUrl;
        }
        if (!result.joinUrl && lookup_result.joinUrl)
        {
          result.joinFrom = lookup_result.joinFrom;
          result.joinUrl = lookup_result.joinUrl;
        }
      }
    }

    return result;
  }

  static createPowerset(albumArtist, albumName)
  {
    let result = [];

    if (albumArtist && albumName)
      result.push({albumArtist, albumName});
    if (albumArtist)
      result.push({albumArtist});
    if (albumName)
      result.push({albumName});

    return result;
  }
}

module.exports = StaticOverridesFetcher;
