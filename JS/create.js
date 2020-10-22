let favorited = (event) => {
    let row = event.target.parentNode.parentNode;
    console.log(row.getAttribute('data-id') + ": " + event.target.checked);
    let url = API_HOST.concat('/api/users/' + DEFAULT_USERID);
    switch(row.className)
    {
        case "songRow":
            let songID = row.getAttribute('data-id');
            url = url + '/favorite-songs/';
            console.log("Favorite song: " + songID);
            $.ajax({
                url: url,
                type: event.target.checked ? 'PUT' : 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({songID: songID}),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " songID:" + data.songID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "albumRow":
            let releaseID = row.getAttribute('data-id');
            url = url + '/favorite-releases/';
            console.log("Favorite album: " + releaseID);
            $.ajax({
                url: url,
                type: event.target.checked ? 'PUT' : 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({releaseID: releaseID}),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " releaseID:" + data.releaseID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
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
    switch(row.className)
    {
        case "songRowx":
            let songID = row.getAttribute('data-id');
            let url = API_HOST.concat('/api/users/' + DEFAULT_USERID + '/play-songs/');
            console.log("Played song: " + songID);
            $.ajax({
                url: url,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({songID: songID}),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " songID:" + data.songID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "albumRow":

            break;
        case "artistRow":
            
            break;
        case "albumSongRow":
            
            break;
    }
    
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
    
    //album.click(loadAlbum);
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

let genreCreate = (id, name, favBool) => {
    $('#genreList').append(
        $('<tr></tr>', {"class": "genreRow"}).append(
            $('<td/>', {"class": "fav"}).append(
                $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}).click(favorited),
                $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
        ), $('<td/>', {"class": "genreName"}).text(name)).attr('data-id', id));
}
