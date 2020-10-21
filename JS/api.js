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

