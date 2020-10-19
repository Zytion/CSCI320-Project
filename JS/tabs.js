let tabClick = (e) => {
    for(let li of tabs)
    {
        li.className = "";
        if(li.dataset.tab == e.target.dataset.tab)
            li.className = "active";
    }
    changeTab(e.target.dataset.tab);
}

let small = document.querySelector("#tabs small");
let pages = document.querySelectorAll("main > *")
function changeTab(tab) {
    pages.forEach(element => {
        element.className = "hidden";
    });

    small.innerHTML = "Showing " + tab + " by name";
    switch(tab)
    {
        case "Songs":
            loadSongs();
            pages[0].className = "";
            break;
        case "Artists":
            loadArtists();
            pages[1].className = "";
            break;
        case "Albums":
            loadAlbums();
            pages[2].className = "";
            break;
        case "Genres":
            pages[3].className = "";
            break;
        case "Playlists":
            pages[4].className = "";
            break;
    }
}
let loadArtists = () => {
    $('#artistList').empty();
    $('#artistList').append(
    `<th class="fav"></th> <th class="artistName">Name</th>`);
   
    var i;
    for(i = 0; i < 10; i++)
        createArtist(i, "artest" + i, false);
}

let loadAlbums= () => {
    $('#albumList').empty();
    $('#albumList').append(
    `<th class="fav"></th> <th class="albumTitles">Title</th> <th class="albumArtists">Artist</th>`);
    var i;
    for(i = 0; i < 10; i++)
        createAlbum(i, "testing" + i, "tester", false);
}

let loadAlbum = (event) => {
    console.log('Load album id: ' + event.currentTarget.getAttribute('data-id'));
    
    $('#albumSongs').empty();
    $('#albumSongs').append(
    `<th class="fav"></th> <th class="trackNumber">Track</th> <th class="songTitles">Title</th>` + 
    `<th class="songGenres">Genre</th>` + 
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th> <th class="songPlays">Times Played</th>`);

    var i;
    for(i = 0; i < 5; i++)
        createAlbumSong("title" + i, "rock", "20:20", "1000 AD", false, i + 1, i);


        window.scroll(0, 0);
    $('#detailsPage').slideToggle("slow", function(){
        $('main').hide();
    });
}
let unloadAlbum = () => {
    $('main').show();
    $('#detailsPage').slideToggle("slow");
}

let loadSongs = () => {
    $('#songList').empty();
    $('#songList').append(
    `<th class="fav"></th> <th class="songTitles">Title</th> <th class="songArtists">Artist</th>` + 
    `<th class="songAlbums">Album</th> <th class="songGenres">Genre</th>` + 
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th><th class="songPlays">Times Played</th>`);
   
    var i;
    for(i = 0; i < 10; i++)
        createSong("songList", i, "title" + i, "artest" + i, "album", "rock", "20:20", "1000 AD", false, i);
}