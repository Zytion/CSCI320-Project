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