let tabClick = (e) => {
    pageNum = 1;
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
var currentTab;

function changeTab(tab) {
    currentTab = tab;
    pages.forEach(element => {
        element.className = "hidden";
    });
    
    document.querySelector('#pageButtons').className = "";

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
        url = url.concat('?name=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);


    let favArray = [];

    $.getJSON(API_HOST.concat('/api/users/' + DEFAULT_USERID + '/favorite-artists/'), function(data) {
        $.each(data.artists, function(i,artist) {
            favArray.push(artist.artistID); 
        });
    });

    $.getJSON( url, function( data ) {
        $.each(data.artists, function(i,artist){
            createArtist(
                artist.artistID, 
                artist.name, 
                favArray.includes(artist.artistID));
        });
    });
}

let loadAlbums= () => {
    $('#albumList').empty();
    $('#albumList').append(
    `<th class="fav"></th> <th class="albumTitles">Title</th> <th class="albumArtists">Artist</th>`);
    let url = API_HOST.concat('/api/releases');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    let favArray = [];

    $.getJSON(API_HOST.concat('/api/users/' + DEFAULT_USERID + '/favorite-releases/'), function(data) {
        $.each(data.releases, function(i,release) {
            favArray.push(release.releaseID); 
        });
    });

    $.getJSON(url, function( data ) {
        //console.log(data);
        $.each(data.releases, function(i, release){
            let artists = release.artists;
            let artComp = artists[0].name;
            for(let i = 1; i < artists.length; i++)
            {
                artComp = artComp.concat(", ", artists[i].name);
            }
            createAlbum(
                    release.releaseID,
                    release.title,
                    artComp,
                    favArray.includes(release.releaseID));
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

    let url = API_HOST.concat('/api/releases');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    let favArray = [];

    $.getJSON(API_HOST.concat('/api/users/' + DEFAULT_USERID + '/favorite-releases/'), function(data) {
        $.each(data.albums, function(i,album) {
            favArray.push(album.albumID); 
        });
    });

    $.getJSON(url, function( data ) {
        //console.log(data);
        $.each(data.albums, function(i, album){
            createAlbum(
                    album.albumID,
                    album.title,
                    album.artist,
                    favArray.includes(album.albumID));
        });
    });

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

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/favorite-songs/');
    let favArray = [];

    $.getJSON(url, function(data) {
        $.each(data.songs, function(i,song) {
            favArray.push(song.songID);
        });
    });

    url = API_HOST.concat('/api/songs/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    $.getJSON(url, function( data ) {
        //console.log(data);
        $.each(data.songs, function(i, song){
            let genres = song.genres[0].name; 
            let length = song.genres.length;
            if(length > 3)
                length = 3;
            for(let i = 1; i < length; i++)
            {
                genres = genres.concat(', ' + song.genres[i].name);
            }
           
            let artists = song.artists[0].name;
            length = song.artists.length;
            if(length > 3)
                length = 3;
            for(let i = 1; i < length; i++)
            {
                artists = artists.concat(', ' + song.artists[i].name);
            }

            let songSeconds = song.length % 60;
            if(songSeconds < 10)
                songSeconds += '0';
            createSong("songList",
                        song.songID,
                        song.title,
                        artists,
                        song.release.title,
                        genres,
                        Math.trunc(song.length / 60) + ":" + songSeconds,
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
        changeTab(currentTab);
    }
}

let loadNextPage = () => {
    pageNum++;
    changeTab(currentTab);
}

let loadPlaylist = () => {
    $('#playlistList').empty();
    $('#playlistList').append(
    `<th class="play"</th>` +
    `<th class="fav"></th> <th class="songTitles">Title</th> <th class="songArtists">Artist</th>` +
    `<th class="songAlbums">Album</th> <th class="songGenres">Genre</th>` +
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th><th class="songPlays">Times Played</th>`);

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/favorite-songs/');
    let favArray = [];

    $.getJSON(url, function(data) {
        $.each(data.songs, function(i,song) {
            favArray.push(song.songID);
        });
    });

    url = API_HOST.concat('/api/songs/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    $.getJSON(url, function( data ) {
        //console.log(data);
        $.each(data.songs, function(i, song){
            let genres = song.genres[0].name; 
            let length = song.genres.length;
            if(length > 3)
                length = 3;
            for(let i = 1; i < length; i++)
            {
                genres = genres.concat(', ' + song.genres[i].name);
            }
            
            let artists = song.artists[0].name;
            length = song.artists.length;
            if(length > 3)
                length = 3;
            for(let i = 1; i < length; i++)
            {
                artists = artists.concat(', ' + song.artists[i].name);
            }

            let songSeconds = song.length % 60;
            if(songSeconds < 10)
                songSeconds += '0';
            if(favArray.includes(song.songID))
            {
                    createSong("playlistList",
                        song.songID,
                        song.title,
                        artists,
                        song.release.title,
                        genres,
                        Math.trunc(song.length / 60) + ":" + songSeconds,
                        song.release.release_date,
                        favArray.includes(song.songID),
                        0);
            }
            
        });
    });
}

let loadGeneres = () => {
    $('#genreList').empty();
    $('#genreList').append(`<th class="songTitles">Title</th>`);

    let url = API_HOST.concat('/api/genres');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    var favArray = [];

    $.getJSON(url, function( data ) {
        //console.log(data);
        $.each(data.genres, function(i, genre){
            genreCreate(
                        genre.genreID,
                        genre.title);
        });
    });
}
