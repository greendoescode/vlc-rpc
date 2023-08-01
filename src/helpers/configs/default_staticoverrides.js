
// Include your static overrides here
// Overrides may use album artist name or album name in keys, most specific combination being used first
// Overrides must contain fetchedFrom, artworkUrl and joinUrl in aggregate value to be used
// For example:
/*
module.exports = [
  {key: {albumArtist: "Artist1", albumName: "Album1"},
   value: {fetchedFrom: "Example1", artworkUrl: "example1.jpg", joinUrl: "example1"}},

  {key: {albumName: "Album2"},
   value: {joinUrl: "example2a"}},
  {key: {albumArtist: "Artist1", albumName: "Album2"},
   value: {fetchedFrom: "Example2b", artworkUrl: "example2b.jpg", joinUrl: "example2b"}},

  {key: {albumArtist: "Artist1"},
   value: {fetchedFrom: "Example3", artworkUrl: "example3.jpg"}},
  {key: {albumName: "Album3"},
   value: {joinUrl: "example3"}},
]
*/
// will return:

//   for "Album1" by "Artist1":
//     {fetchedFrom: "Example1", artworkUrl: "example1.jpg", joinUrl: "example1"}
//       (no tricks here, key is exact match and values are complete)

//   for "Album2" by "Artist1":
//     {fetchedFrom: "Example2b", artworkUrl: "example2b.jpg", joinUrl: "example2b"}
//       (because the most specific key is used first)

//   for "Album3" by "Artist1":
//     {fetchedFrom: "Example3", artworkUrl: "example3.jpg", joinUrl: "example3"}
//       (because partial information gets combined)

//   for "Album4" by "Artist1" or "Album1", "Album2", "Album3" by "Artist2":
//     nothing
//       (because some values wouldn't be set)


module.exports = [

]
