// Rest API server URL
const API_HOST = "http://music3.club";
// Default userID for favoriting when a user is not logged in
const DEFAULT_USERID = "7";

let getSongs = () =>
{
    $.getJSON( "http://music3.club/api/songs/", function( data ) {
        console.log(data);
      });
}


function getGeneres(data){
  if(data.genres.length == 0)
    return "";
  let genres = data.genres[0].name;
  let length = data.genres.length;
  if (length > 3)
      length = 3;
  for (let i = 1; i < length; i++) {
      genres = genres.concat(', ' + data.genres[i].name);
  }
  return genres;
}

function getArtists(data){
  if(data.artists.length == 0)
    return "";
  let artists = data.artists[0].name;
  length = data.artists.length;
  if (length > 3)
      length = 3;
  for (let i = 1; i < length; i++) {
      artists = artists.concat(', ' + data.artists[i].name);
  }
  return artists;
}

function getSongTime(data) {
  let songSeconds = data.length % 60;
  if (songSeconds < 10)
      songSeconds += '0';
  return Math.trunc(data.length / 60) + ":" + songSeconds;
}