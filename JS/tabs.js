let tabClick = (e) => {
    pageNum = 1;
    for (let li of tabs) {
        li.className = "";
        if (li.dataset.tab == e.target.dataset.tab)
            li.className = "active";
    }
    changeTab(e.target.dataset.tab);
    document.querySelector('#keyword').value = "";
}

let searchClick = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        pageNum = 1;
        for (let li of tabs) {
            if (li.className == "active") {
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

    unloadRelease();

    document.querySelector('#pageButtons').className = "";

    small.innerHTML = "Showing " + tab;
    switch (tab) {
        case "Songs":
            loadSongs();
            pages[0].className = "";
            enablePageButtons();
            break;
        case "Artists":
            loadArtists();
            pages[1].className = "";
            enablePageButtons();
            break;
        case "Releases":
            loadReleases();
            pages[2].className = "";
            enablePageButtons();
            break;
        case "Genres":
            loadGeneres();
            pages[3].className = "";
            enablePageButtons();
            break;
        case "Favorite Songs":
            loadFavoriteSongs();
            pages[4].className = "";
            disablePageButtons();
            break;
        case "Favorite Artists":
            loadFavoriteArists();
            pages[5].className = "";
            disablePageButtons();
            break;
        case "Favorite Releases":
            loadFavoriteReleases();
            pages[6].className = "";
            disablePageButtons();
            break;
        case "Playlists":
            loadPlaylist();
            pages[7].className = "";
            break;
        case "Friends":
            loadFriends();
            pages[8].className = "";
            break;
        case "Users":
            loadUsers();
            pages[9].className = "";
            break;
        case "Collections":
            loadCollections();
            pages[10].className = "";
            break;
    }
}

let loadArtists = () => {
    $('#artistList').empty();
    $('#artistList').append(
        `<th class="fav"></th><th class="addTo"></th><th class="artistName">Name</th>`);

    let url = API_HOST.concat('/api/artists/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?name=', searchTerm, '&page=', pageNum, '&user=', DEFAULT_USERID);
    else
        url = url.concat('?page=', pageNum, '&user=', DEFAULT_USERID);

    $.getJSON(url, function (data) {
        $.each(data.artists, function (i, artist) {
            createArtist(
                'artistList',
                artist.artistID,
                artist.name,
                artist.favorite);
        });
    });
}

let loadCollections = () => {
    let url = API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/');

    $('#collection').empty();

    $.getJSON(url, function (data) {
        $.each(data.collections, function (i, collection) {
            $('#collection').append(
                $('<option></option>', { "value": collection.collectionID }).text(collection.name).attr('data-id', collection.collectionID)
            );
        });
    }).then(function () {
        $('#collection').trigger("change");
    });

}

let changeCollection = (e) => {
    $('#collectionList').empty();
    $('#collectionList').append(
        `<th class="collectionItemName">Name</th>` +
        `<th class="collectionItemType">Type</th>`);
    

    if(e.target.selectedIndex == -1)
    {
        $('#collection').append(
            $('<option></option>', { "value": -1 }).text('No Collections').attr('data-id', -1)
        );
        return;
    }
    
    let id = e.target[e.target.selectedIndex].getAttribute(('data-id'));
    let url = API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + id);

    $.getJSON(url, function (collection) {
        if (collection.artists.length != 0) {
            $.each(collection.artists, function (i, artist) {
                createCollectionItem('collectionList', artist.artistID, artist.name, "Artist");
            });
        }
        if (collection.releases.length != 0) {
            $.each(collection.releases, function (i, release) {
                createCollectionItem('collectionList', release.releaseID, release.title, release.type);
            });
        }
        if (collection.songs.length != 0) {
            $.each(collection.songs, function (i, song) {
                createCollectionItem('collectionList', song.songID, song.title, "Song");
            });
        }
    });

}

let loadReleases = () => {
    $('#releaseList').empty();
    $('#releaseList').append(
        `<th class="fav"></th>` +
        `<th class="addTo"></th>` +
        `<th class="releaseTitles">Title</th>` +
        `<th class="releaseArtists">Artist</th>` +
        `<th class="releaseTypes">Type</th>` +
        `<th class="releaseDates">Release Date</th>` +
        `<th class="releaseGenres">Genres</th>`);
    let url = API_HOST.concat('/api/releases');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum, '&user=', DEFAULT_USERID);
    else
        url = url.concat('?page=', pageNum, '&user=', DEFAULT_USERID);

    $.getJSON(url, function (data) {
        $.each(data.releases, function (i, release) {
            createRelease(
                'releaseList',
                release.releaseID,
                release.title,
                getArtists(release),
                release.type,
                release.release_date,
                getGenres(release),
                release.favorite);
        });
    });
}

let loadRelease = (event) => {
    if (event.target.className == "heart" ||
     event.target.className == "addTo" ||
     event.target.className == "dropdown-content")
        return;

    $('#releaseSongs').empty();
    $('#releaseSongs').append(
        `<th class="trackNumber">Track</th> <th class="songTitles">Title</th>` +
        `<th class="songLengths">Length</th><th class="songPlays">Times Played</th>`);

    let url = API_HOST.concat('/api/releases/' + event.currentTarget.getAttribute('data-id'));

    $.getJSON(url, function (data) {
        $('#releaseDetailTitle').text(data.title);
        $('#releaseDetailArtist').text(getArtists(data));
        $.each(data.songs, function (i, song) {
            createReleaseSong(
                song.songID,
                song.title,
                getSongTime(song),
                song.track_number,
                song.play_count);
        });
    });

    window.scroll(0, 0);
    $('#detailsPage').slideToggle("slow", function () {
        $('main').hide();
    });
}

let unloadRelease = () => {
    $('main').show();
    $('#detailsPage').hide();
}

let loadSongs = () => {
    $('#songList').empty();
    $('#songList').append(
        `<th class="fav"</th><th class="play"></th><th class="addTo"></th>` +
        `<th class="songTitles">Title</th> <th class="songArtists">Artist</th>` +
        `<th class="songLengths">Length</th><th class="songPlays">Times Played</th>`);

    let url = API_HOST.concat('/api/songs/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?title=', searchTerm, '&page=', pageNum, '&user=', DEFAULT_USERID);
    else
        url = url.concat('?page=', pageNum, '&user=', DEFAULT_USERID);

    $.getJSON(url, function (data) {
        $.each(data.songs, function (i, song) {
            createSong("songList",
                song.songID,
                song.title,
                getArtists(song),
                getSongTime(song),
                song.favorite,
                song.play_count);
        });
    });
}

let loadUsers = () => {
    $('#usersList').empty();
    $('#usersList').append(
        `<th class="fav"></th> <th class="usersName">Name</th>`);

    let url = API_HOST.concat('/api/users/');
    let searchTerm = document.querySelector('#keyword').value;

    if (searchTerm != "")
        url = url.concat('?name=', pageNum, '&user=', DEFAULT_USERID);

    let friends = [];
    let friendURL = API_HOST.concat('/api/users/befriended_by/', DEFAULT_USERID);
    $.getJSON(friendURL, function (data) {
        $.each(data.users, function (i, friend) {
            friends.push(friend.user.userID);
        });
    });

    $.getJSON(url, function (data) {
        $.each(data.users, function (i, user) {
            createUser(
                user.userID,
                user.profilename,
                friends.includes(user.userID));
        });
    });
}

let loadFriends = () => {
    $('#friendsList').empty();
    $('#friendsList').append(
        `<th class="fav"></th> <th class="friendName">Name</th>`);

    let url = API_HOST.concat('/api/users/befriended_by/');
    url = url.concat(DEFAULT_USERID);

    $.getJSON(url, function (data) {
        $.each(data.users, function (i, friend) {
            createFriend(
                'friendsList',
                friend.user.userID,
                friend.user.profilename,
                true);
        });
    });

}

let loadPrevPage = () => {
    if (pageNum > 1) {
        pageNum--;
        changeTab(currentTab);
    }
}

let loadNextPage = () => {
    pageNum++;
    changeTab(currentTab);
}

let enablePageButtons = () => {
    $('#prevPageButton').prop('disabled', false);
    $('#nextPageButton').prop('disabled', false);
}

let disablePageButtons = () => {
    $('#prevPageButton').prop('disabled', true);
    $('#nextPageButton').prop('disabled', true);
}

let loadFavoriteSongs = () => {
    $('#favSongs').empty();
    $('#favSongs').append(
        `<th class="play"</th>` +
        `<th class="fav"></th><th class="addTo"></th> <th class="songTitles">Title</th> <th class="songArtists">Artist</th>` +
        `<th class="songLengths">Length</th><th class="songPlays">Times Played</th>`);

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/favorite-songs/');

    $.getJSON(url, function (data) {
        $.each(data.songs, function (i, song) {
            createSong("favSongs",
                song.songID,
                song.title,
                getArtists(song),
                getSongTime(song),
                true,
                song.play_count);
        });
    });
}

let loadFavoriteArists = () => {
    $('#favArtistsList').empty();
    $('#favArtistsList').append(
        `<th class="fav"></th><th class="addTo"></th><th class="artistName">Name</th>`);

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/favorite-artists/');
    let searchTerm = document.querySelector('#keyword').value;

    $.getJSON(url, function (data) {
        $.each(data.artists, function (i, artist) {
            if (artist.name.includes(searchTerm)) {
                createArtist(
                    "favArtistsList",
                    artist.artistID,
                    artist.name,
                    true);
            }
        });
    });
}

let loadFavoriteReleases = () => {
    $('#favReleasesList').empty();
    $('#favReleasesList').append(
        `<th class="fav"></th>` +
        `<th class="addTo"></th>` +
        `<th class="releaseTitles">Title</th>` +
        `<th class="releaseArtists">Artist</th>` +
        `<th class="releaseTypes">Type</th>` +
        `<th class="releaseDates">Release Date</th>` +
        `<th class="releaseGenres">Genres</th>`);

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/favorite-releases/');
    let searchTerm = document.querySelector('#keyword').value;

    $.getJSON(url, function (data) {
        $.each(data.releases, function (i, release) {
            if (release.title.includes(searchTerm)) {
                createRelease(
                    'favReleasesList',
                    release.releaseID,
                    release.title,
                    getArtists(release),
                    release.type,
                    release.release_date,
                    getGenres(release),
                    true);
            }
        });
    });
}

let loadPlaylist = () => {
    $('#playlistList').empty();
    $('#playlistList').append(
        `<th class="play"</th>` +
        `<th class="fav"></th>` +
        `<th class="songPlayDate">Play Date</th>` +
        `<th class="songTitles">Title</th>` +
        `<th class="songArtists">Artist</th>` +
        `<th class="songLengths">Length</th>`);

    let url = API_HOST.concat('/api/users/', DEFAULT_USERID, '/play-songs/');

    url = url.concat('?page=', pageNum);

    $.getJSON(url, function (data) {
        $.each(data.playlist, function (i, play) {
            createPlayedSong("playlistList",
                play.song.songID,
                play.song.title,
                getArtists(play.song),
                getSongTime(play.song),
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
    $.getJSON(API_HOST.concat('/api/users/' + DEFAULT_USERID + '/favorite-genres/'), function (data) {
        $.each(data.genres, function (i, genre) {
            favArray.push(genreID.genreID);
        });
    });
}