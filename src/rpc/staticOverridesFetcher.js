
class StaticOverridesFetcher
{
  /** Overrides data to use */
  #data

  constructor(rawData)
  {
    this.#data = {};
    for (let v of rawData)
    {
      // Use key stringified with sorted keys
      this.#data[JSON.stringify(v.key, Object.keys(v.key).sort())] = v.value;
    }
  }

  fetch(metadata)
  {
    let result = {};

    for (let v of StaticOverridesFetcher.createPowerset(metadata.ALBUMARTIST,
                                                        metadata.album))
    {
      let lookup_result = this.#data[JSON.stringify(v)];

      if (lookup_result)
      {
        if (!result.fetchedFrom && lookup_result.fetchedFrom)
          result.fetchedFrom = lookup_result.fetchedFrom;
        if (!result.artworkUrl && lookup_result.artworkUrl)
          result.artworkUrl = lookup_result.artworkUrl;
        if (!result.joinUrl && lookup_result.joinUrl)
          result.joinUrl = lookup_result.joinUrl;

        if (result.fetchedFrom && result.artworkUrl && result.joinUrl)
          return result;
      }
    }
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
