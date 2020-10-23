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
        case "Releases":
            loadReleases();
            pages[2].className = "";
            break;
        case "Playlists":
            loadPlaylist();
            pages[3].className = "";
            break;
    }
}

let loadArtists = () => {
    $('#artistList').empty();
    $('#artistList').append(
    `<th class="fav"></th> <th class="artistName">Name</th>`);

    let url = API_HOST.concat('/api/artists/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?name=', searchTerm, '&page=', pageNum, '&user=', DEFAULT_USERID);
    else
        url = url.concat('?page=', pageNum, '&user=', DEFAULT_USERID);

    $.getJSON( url, function( data ) {
        $.each(data.artists, function(i,artist){
            createArtist(
                artist.artistID,
                artist.name,
                artist.favorite);
        });
    });
}

let loadReleases= () => {

    $('#releaseList').empty();
    $('#releaseList').append(
    `<th class="fav"></th>` +
        `<th class="releaseTitles">Title</th>` +
        `<th class="releaseArtists">Artist</th>` +
        `<th class="releaseTypes">Type</th>` +
        `<th class="releaseDates">Release Date</th>`);
    let url = API_HOST.concat('/api/releases');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum, '&user=', DEFAULT_USERID);
    else
        url = url.concat('?page=', pageNum, '&user=', DEFAULT_USERID);

    $.getJSON(url, function( data ) {
        $.each(data.releases, function(i, release){
            let artists = release.artists;
            let artComp = artists[0].name;
            for(let i = 1; i < artists.length; i++)
            {
                artComp = artComp.concat(", ", artists[i].name);
            }
            createRelease(
                    release.releaseID,
                    release.title,
                    artComp,
                    release.type,
                    release.release_date,
                    release.favorite);
        });
    });
}

let loadRelease = (event) => {
    console.log('Load release id: ' + event.currentTarget.getAttribute('data-id'));
    
    $('#releaseSongs').empty();
    $('#releaseSongs').append(
    `<th class="fav"></th> <th class="trackNumber">Track</th> <th class="songTitles">Title</th>` + 
    `<th class="songGenres">Genre</th>` + 
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th> <th class="songPlays">Times Played</th>`);

    var i;
    for(i = 0; i < 5; i++)
        createReleaseSong("title" + i, "rock", "20:20", "1000 AD", false, i + 1, i);


        window.scroll(0, 0);
    $('#detailsPage').slideToggle("slow", function(){
        $('main').hide();
    });
}
let unloadRelease = () => {
    $('main').show();
    $('#detailsPage').slideToggle("slow");
}

let loadSongs = () => {
    $('#songList').empty();
    $('#songList').append(
    `<th class="play"</th>` +
    `<th class="fav"></th> <th class="songTitles">Title</th> <th class="songArtists">Artist</th>` + 
    `<th class="songReleases">Release</th> <th class="songGenres">Genre</th>` +
    `<th class="songLengths">Length</th> <th class="songDates">Release Date</th><th class="songPlays">Times Played</th>`);

    let url = API_HOST.concat('/api/songs/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum, '&user=', DEFAULT_USERID);
    else
        url = url.concat('?page=', pageNum, '&user=', DEFAULT_USERID);

    $.getJSON(url, function( data ) {
        $.each(data.songs, function(i, song){
            let genres = '';
            if (song.genres.length > 0){
                genres = song.genres[0].name;
                let length = song.genres.length;
                if(length > 3)
                    length = 3;
                for(let i = 1; i < length; i++)
                {
                    genres = genres.concat(', ' + song.genres[i].name);
                }
            }
            let artists = '';
            if(song.artists.length > 0){
                artists = song.artists[0].name;
                length = song.artists.length;
                if(length > 3)
                    length = 3;
                for(let i = 1; i < length; i++)
                {
                    artists = artists.concat(', ' + song.artists[i].name);
                }
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
                        song.favorite,
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
        `<th class="fav"></th>` +
        `<th class="songPlayDate">Play Date</th>` +
        `<th class="songTitles">Title</th>` +
        `<th class="songArtists">Artist</th>` +
        `<th class="songAlbums">Album</th>` +
        `<th class="songLengths">Length</th>`);

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/play-songs/');

    url = url.concat('?page=', pageNum);

    $.getJSON(url, function( data ) {
        $.each(data.playlist, function(i, play){
            let artists = '';
            if(play.song.artists.length > 0){
                artists = play.song.artists[0].name;
                let length = play.song.artists.length;
                if(length > 3)
                    length = 3;
                for(let i = 1; i < length; i++)
                {
                    artists = artists.concat(', ' + play.song.artists[i].name);
                }
            }
            let songSeconds = play.song.length % 60;
            if(songSeconds < 10)
                songSeconds += '0';

            createPlayedSong("playlistList",
                play.song.songID,
                play.song.title,
                artists,
                play.song.release.title,
                Math.trunc(play.song.length / 60) + ":" + songSeconds,
                play.playDate,
                play.song.favorite);
        });
    });
}

let loadGenres = () => {
    $('#genreList').empty();
    $('#genreList').append(`<th class="songTitles">Title</th>`);

    let url = API_HOST.concat('/api/genres');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum);
    else
        url = url.concat('?page=', pageNum);

    var favArray = [];
    $.getJSON(API_HOST.concat('/api/users/' + DEFAULT_USERID + '/favorite-genres/'), function(data) {
        $.each(data.genres, function(i,genre) {
            favArray.push(genreID.genreID);
        });
    });
}
