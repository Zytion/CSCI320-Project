let getSongs = () =>
{
    $.getJSON( "http://music3.club/api/songs/", function( data ) {
        console.log(data);
      });
}

