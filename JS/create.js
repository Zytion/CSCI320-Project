let favorited = (event) => {
    let row = event.target.parentNode.parentNode;
    console.log(row.getAttribute('data-id') + ": " + event.target.checked);

    switch(row.className)
    {
        case "songRow":
            if(event.target.checked)
            {
                $.ajax({
                url: '/api/users/1/favorite-songs/',
                type: 'PUT',
                data: "songID=" + row.getAttribute('data-id'),
                success: function(data) {
                  alert('Put was performed.');
                }
              });
            }
            else
            {
                $.ajax({
                    url: '/api/users/1/favorite-songs/',
                    type: 'DELETE',
                    data: "songID=" + row.getAttribute('data-id'),
                    success: function(data) {
                      alert('Delete was performed.');
                    }
                  }); 
            }
            break;
        case "albumRow":

            break;
        case "artistRow":
            
            break;
        case "albumSongRow":
            
            break;
    }
}

let play = (event) => 
{
    let row = event.target.parentNode.parentNode;
    console.log(row.getAttribute('data-id') + ": played");
}

let createAlbum = (id, title, artist, favBool) =>
{
    var album = $('<tr></tr>', {"class" : 'albumRow'}).append(
        $('<td/>', {"class": "fav"}).append(
            $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}).click(favorited),
            $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
    ),
    $('<td/>', {"class": "albumTitles"}).text(title),
    $('<td/>', {"class": "albumArtists"}).text(artist));
    
    album.click(loadAlbum);
    album.attr('data-id', id);

    $('#albumList').append(album);
}

let createSong = (list, id, title, artist, album, genre, length, date, favBool, plays) => {
    $('#' + list).append(
        $('<tr></tr>', {"class" : 'songRow'}).append(
            $('<td/>', {"class": "fav"}).append(
                $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}).click(favorited),
                ($('<label/>', { "class": "container", "class" : "heart"}).text('❤'))

        ),
        $('<td/>', {"class": "play"}).append(
            $('<input/>', { "type": "button", "class" : "play"}).click(play),
            ($('<label/>', { "class": "container", "class" : "play"}).text('▷'))
        ),
        $('<td/>', {"class": "songTitles"}).text(title),
        $('<td/>', {"class": "songArtists"}).text(artist),
        $('<td/>', {"class": "songAlbums"}).text(album),
        $('<td/>', {"class": "songGenres"}).text(genre),
        $('<td/>', {"class": "songLengths"}).text(length),
        $('<td/>', {"class": "songDates"}).text(date),
        $('<td/>', {"class": "songPlays"}).text(plays)
        ).attr('data-id', id));
}
let createArtist = (id, name, favBool) => {
    $('#artistList').append(
        $('<tr></tr>', {"class": "artistRow"}).append(
            $('<td/>', {"class": "fav"}).append(
                $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}).click(favorited),
                $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
        ), $('<td/>', {"class": "artistName"}).text(name)).attr('data-id', id));
}
let createAlbumSong = (title, genre, length, date, favBool, track, plays) => {
    $('#albumSongs').append(
        $('<tr></tr>', {"class" : 'albumSongRow'}).append(
            $('<td/>', {"class": "fav"}).append(
                $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}).click(favorited),
                $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
        ),
        $('<td/>', {"class": "trackNumber"}).text(track),
        $('<td/>', {"class": "songTitles"}).text(title),
        $('<td/>', {"class": "songGenres"}).text(genre),
        $('<td/>', {"class": "songLengths"}).text(length),
        $('<td/>', {"class": "songDates"}).text(date),
        $('<td/>', {"class": "songPlays"}).text(plays)));
}