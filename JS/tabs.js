let tabClick = (e) => {
    for(let li of tabs)
    {
        li.className = "";
        if(li.dataset.tab == e.target.dataset.tab)
            li.className = "active";
    }
    changeTab(e.target.dataset.tab);
}

let searchClick = (e) => {
    if (e.key === 'Enter' || e.type ==='click'){
        pageNum = 1;
        for(let li of tabs)
        {
            if(li.className == "active"){
                changeTab(li.dataset.tab);
            }
        }
    }
}

let small = document.querySelector("#tabs small");
let pages = document.querySelectorAll("main > *");


function changeTab(tab) {
    pages.forEach(element => {
        element.className = "hidden";
    });
    
    document.querySelector('#pageButtons').className = "";

    small.innerHTML = "Showing " + tab + " by name";
    switch(tab)
    {
        case "Songs":
            pageNum = 1;
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
            loadGeneres();
            pages[3].className = "";
            break;
        case "Playlists":
            loadPlaylist();
            pages[4].className = "";
            break;
    }
}

let loadArtists = () => {
    $('#artistList').empty();
    $('#artistList').append(
    `<th class="fav"></th> <th class="artistName">Name</th>`);

    var url = API_HOST.concat('/api/artists/');
    var searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    $.getJSON( url, function( data ) {
        $.each(data.artists, function(i,artist){
            createArtist(i, artist.name, false);
        });
    });
}

let loadAlbums= () => {
    $('#albumList').empty();
    $('#albumList').append(
    `<th class="fav"></th> <th class="albumTitles">Title</th> <th class="albumArtists">Artist</th>`);
    let url = API_HOST.concat('/api/albums');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    var favArray = [];

    $.getJSON('http://music3.club/api/users/' + DEFAULT_USERID + '/favorite-albums/', function(data) {
        $.each(data.albums, function(i,album) {
            favArray.push(album.albumID); 
        });
    });

    $.getJSON(url, function( data ) {
        console.log(data);
        $.each(data.albums, function(i, album){
            createAlbum(
                    album.albumID,
                    album.title,
                    album.artist,
                    favArray.includes(album.albumID));
        });
    });
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
    `<th class="play"</th>` +
    `<th class="fav"></th> <th class="songTitles">Title</th> <th class="songArtists">Artist</th>` + 
    `<th class="songAlbums">Album</th> <th class="songGenres">Genre</th>` + 
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th><th class="songPlays">Times Played</th>`);

    //TODO: Mark favorite songs in the grid
    //TODO: Find a way to display multiple artists/genres
    //TODO: Format the release_date as mm:ss e.g. 5:34
    let url = API_HOST.concat('/api/songs/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);
    var favArray = [];

    $.getJSON('http://music3.club/api/users/' + DEFAULT_USERID + '/favorite-songs/', function(data) {
        $.each(data.songs, function(i,song) {
            favArray.push(song.songID); 
        });
    });

    $.getJSON(url, function( data ) {
        console.log(data);
        $.each(data.songs, function(i, song){
            createSong("songList",
                        song.songID,
                        song.title,
                        song.artists.length > 0 ? song.artists[0].name : '',
                        song.release.title,
                        song.genres.length > 0 ? song.genres[0].name : '',
                        song.length,
                        song.release.release_date,
                        favArray.includes(song.songID),
                        0);
        });
    });
}
let loadPrevPage = () => {
    if(pageNum > 1)
    {
        pageNum--;
        loadSongs();
    }
}

let loadNextPage = () => {
    pageNum++;
    loadSongs();
}

let loadPlaylist = () => {
    $('#playlistList').empty();
    $('#playlistList').append(
    `<th class="play"</th>` +
    `<th class="fav"></th> <th class="songTitles">Title</th> <th class="songArtists">Artist</th>` + 
    `<th class="songAlbums">Album</th> <th class="songGenres">Genre</th>` + 
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th><th class="songPlays">Times Played</th>`);

    //TODO: Mark favorite songs in the grid
    //TODO: Find a way to display multiple artists/genres
    //TODO: Format the release_date as mm:ss e.g. 5:34
    let url = API_HOST.concat('/api/songs/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    var favArray = [];

    $.getJSON('http://music3.club/api/users/' + DEFAULT_USERID + '/favorite-songs/', function(data) {
        $.each(data.songs, function(i,song) {
            favArray.push(song.songID); 
        });
    });

    $.getJSON(url, function( data ) {
        console.log(data);
        $.each(data.songs, function(i, song){
            if(favArray.includes(song.songID))
            {
                    createSong("playlistList",
                        song.songID,
                        song.title,
                        song.artists.length > 0 ? song.artists[0].name : '',
                        song.release.title,
                        song.genres.length > 0 ? song.genres[0].name : '',
                        song.length,
                        song.release.release_date,
                        favArray.includes(song.songID),
                        0);
            }

        });
    });
}

let loadGeneres = () => {
    $('#genreList').empty();
    $('#genreList').append(`<th class="fav"></th> <th class="songTitles">Title</th>`);

    let url = API_HOST.concat('/api/genres');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    var favArray = [];

    $.getJSON('http://music3.club/api/users/' + DEFAULT_USERID + '/favorite-genres/', function(data) {
        $.each(data.genres, function(i,genre) {
            favArray.push(genreID.genreID); 
        });
    });

    $.getJSON(url, function( data ) {
        console.log(data);
        $.each(data.genres, function(i, genre){
            genreCreate(
                        genre.genreID,
                        genre.title,
                        favArray.includes(genre.genreID));
        });
    });
}