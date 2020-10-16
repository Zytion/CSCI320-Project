let createAlbum = (artSrc, title, artest) =>
{
    var albummArt = $("<img></img>");
    albummArt.attr('src', artSrc);
    var albumName = $("<h2></h2>").text(title);
    var artestName = $("<h3></h3>").text(artest);
    var div = $("<div></div>").append(albumName, artestName);
    var li = $(`<li class="album"></li>`);
    li.append(albummArt, div);
    li.click({id: "testid"}, loadAlbum);
    $("#albumList").append(li);
}

let createSong = (list, title, artist, album, genre, length, date, favBool) => {
    $('#' + list).append(
        $('<tr></tr>').append(
            $('<td/>', {"class": "fav"}).append(
                $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}),
                $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
        ),
        $('<td/>', {"class": "songTitles"}).text(title),
        $('<td/>', {"class": "songArtists"}).text(artist),
        $('<td/>', {"class": "songAlbums"}).text(album),
        $('<td/>', {"class": "songGenres"}).text(genre),
        $('<td/>', {"class": "songLengths"}).text(length),
        $('<td/>', {"class": "songDates"}).text(date)
        ));
}

let createAlbumSong = (title, artist, album, genre, length, date, favBool, track) => {
    $('#albumSongs').append(
        $('<tr></tr>').append(
            $('<td/>', {"class": "fav"}).append(
                $('<input/>', { "type": "checkbox", "class" : "heart", "checked" : favBool}),
                $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
        ),
        $('<td/>', {"class": "trackNumber"}).text(track),
        $('<td/>', {"class": "songTitles"}).text(title),
        $('<td/>', {"class": "songArtists"}).text(artist),
        $('<td/>', {"class": "songAlbums"}).text(album),
        $('<td/>', {"class": "songGenres"}).text(genre),
        $('<td/>', {"class": "songLengths"}).text(length),
        $('<td/>', {"class": "songDates"}).text(date)));
}