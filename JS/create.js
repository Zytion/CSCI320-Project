let createAlbum = (artSrc, title, artest) =>
{
    var albummArt = $("<img></img>");
    albummArt.attr('src', artSrc);
    var albumName = $("<h2></h2>").text(title);
    var artestName = $("<h3></h3>").text(artest);
    var div = $("<div></div>").append(albumName, artestName);
    var li = $(`<li class="album"></li>`);
    li.append(albummArt, div);
    $("#albumList").append(li);
}

let createSong = (title, artist, album, genre, length, date) => {
    $("#songList").append(
        $('<tr></tr>').append(
        $('<td/>').append(
            $('<input/>', { "type": "checkbox", "class" : "heart"}),
            $('<label/>', { "class": "container", "class" : "heart"}).text('❤')
        ),
        $('<td/>').text(title),
        $('<td/>').text(artist),
        $('<td/>').text(album),
        $('<td/>').text(genre),
        $('<td/>').text(length),
        $('<td/>').text(date)
        ));
}