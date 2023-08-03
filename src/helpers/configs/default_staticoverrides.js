
// Include your static overrides here
// Override's key may use album artist name or album name, most specific combination being used first
// Override's value must contain artworkFrom and artworkUrl or joinFrom and joinUrl or all four
// For example:
/*
module.exports = [
  {key: {albumArtist: "Artist1", albumName: "Album1"},
   value: {artworkFrom: "Example1", artworkUrl: "example1.jpg", joinFrom: "Example1", joinUrl: "example1"}},

  {key: {albumName: "Album2"},
   value: {joinUrl: "example2a"}},
  {key: {albumArtist: "Artist1", albumName: "Album2"},
   value: {artworkFrom: "Example2b", artworkUrl: "example2b.jpg", joinFrom: "Example2b", joinUrl: "example2b"}},

  {key: {albumArtist: "Artist1"},
   value: {artworkFrom: "Example3", artworkUrl: "example3.jpg"}},

  {key: {albumName: "Album4"},
   value: {joinFrom: "Example4", joinUrl: "example4.jpg"}},
]
*/
// will return:

//   for "Album1" by "Artist1":
//     {artworkFrom: "Example1", artworkUrl: "example1.jpg", joinFrom: "Example1", joinUrl: "example1"}
//       (no tricks here, the key is an exact match)

//   for "Album2" by "Artist1":
//     {artworkFrom: "Example2b", artworkUrl: "example2b.jpg", joinFrom: "Example2b", joinUrl: "example2b"}
//       (because the most specific key is used first)

//   for "Album3" by "Artist1":
//     {fetchedFrom: "Example3", artworkUrl: "example3.jpg"}
//       (because it is the best match for given album)

//   for "Album4" by "Artist1":
//     {artworkFrom: "Example3", artworkUrl: "example3.jpg", joinFrom: "Example4", joinUrl: "example4.jpg"}
//       (partial matches for "Album4" and "Artist1" get combined)


module.exports = [

]
