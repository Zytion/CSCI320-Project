let favorited = (event) => {
    let row = event.target.parentNode.parentNode;
    console.log(row.getAttribute('data-id') + ": " + event.target.checked);
    let url = API_HOST.concat('/api/users/' + DEFAULT_USERID);
    switch (row.className) {
        case "songRow":
        case "playedSongRow":
            let songID = row.getAttribute('data-id');
            url = url + '/favorite-songs/';
            console.log("Favorite song: " + songID);
            $.ajax({
                url: url,
                type: event.target.checked ? 'PUT' : 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ songID: songID }),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " songID:" + data.songID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                },
                complete: function (xhr, status) {
                    console.log("Update Playlist");
                    loadPlaylist();
                }
            });
            break;
        case "releaseRow":
            let releaseID = row.getAttribute('data-id');
            url = url + '/favorite-releases/';
            console.log("Favorite album: " + releaseID);
            $.ajax({
                url: url,
                type: event.target.checked ? 'PUT' : 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ releaseID: releaseID }),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " releaseID:" + data.releaseID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "artistRow":
            let artistID = row.getAttribute('data-id');
            url = url + '/favorite-artists/';
            console.log("Favorite artists: " + artistID);
            $.ajax({
                url: url,
                type: event.target.checked ? 'PUT' : 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ artistID: artistID }),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " artistID:" + data.artistID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "friendRow":
        case "usersRow":
            let friendID = row.getAttribute('data-id');
            url = url + '/friend/';
            console.log("Friend: " + friendID);
            $.ajax({
                url: url,
                type: event.target.checked ? 'PUT' : 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ friendID: friendID }),
                success: function (data, status) {
                    console.log("status:" + status + " userID:" + data.userID + " friendID:" + data.friendID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
    }
}

let play = (event) => {
    event.target.parentNode.parentNode.children[5].innerText++
    let row = event.target.parentNode.parentNode;
    let songID = row.getAttribute('data-id');
    console.log(songID + ": played");
    switch (row.className) {
        case "songRow":
            console.log("Played from Songs: " + songID);
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/play-songs/'),
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ songID: songID }),
                success: function (data, status) {
                    console.log("status:" + status + " playID:" + data.playID + " playDate:" + data.playDate);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                },
                complete: function (xhr, status) {
                    console.log("Update Songslist");
                    //TODO: How can we update the favoriteSongs list when play was clicked from songs
                }
            });
            break;
        case "playedSongRow":
            console.log("Played from playlist: " + songID);
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/play-songs/'),
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ songID: songID }),
                success: function (data, status) {
                    console.log("status:" + status + " playID:" + data.playID + " playDate:" + data.playDate);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                },
                complete: function (xhr, status) {
                    console.log("Update Playlist");
                }
            });
            break;
    }

}

let addToCollection = (event) => {
    let row = event.target.parentNode.parentNode.parentNode;
    let collectionID = event.target.getAttribute('data-id');
    let itemID = row.getAttribute('data-id');

    switch (row.className) {
        case "playedSongRow":
        case "songRow":
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + collectionID),
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ songID: itemID }),
                success: function (data, status) {
                    console.log("status:" + status + " song:" + data.song);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "artistRow":
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + collectionID),
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ artistID: itemID }),
                success: function (data, status) {
                    console.log("status:" + status + " artist:" + data.artist);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "releaseRow":
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + collectionID),
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ releaseID: itemID }),
                success: function (data, status) {
                    console.log("status:" + status + " release:" + data.release);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
    }

}

let removeFromCollection = (e) => {
    let collectionDropdown = $('#collection')[0];
    if (collectionDropdown.selectedIndex == -1)
        return;
    
    let collectionID = collectionDropdown[collectionDropdown.selectedIndex].getAttribute('data-id');
    let row = e.target.parentNode.parentNode.parentNode;
    let itemID = row.getAttribute('data-id');

    switch (row.className) {
        case "playedSongRow":
        case "songRow":
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + collectionID),
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ songID: itemID }),
                success: function (data, status) {
                    console.log("status:" + status + " song:" + data.song);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "artistRow":
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + collectionID),
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ artistID: itemID }),
                success: function (data, status) {
                    console.log("status:" + status + " artist:" + data.artist);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
        case "releaseRow":
            $.ajax({
                url: API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/' + collectionID),
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ releaseID: itemID }),
                success: function (data, status) {
                    console.log("status:" + status + " release:" + data.release);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                }
            });
            break;
    }
}

let createRelease = (list, id, title, artist, type, releaseDate, genres, favBool) => {
    var release = $('<tr></tr>', { "class": 'releaseRow' }).append(
        $('<td/>', { "class": "fav" }).append(
            $('<input/>', { "type": "checkbox", "class": "heart", "checked": favBool }).click(favorited),
            $('<label/>', { "class": "container", "class": "heart" }).text('❤')
        ),
        $('<td/>', { "class": "addTo" }).append(
            $('<label/>', { "class": "addTo" }).html('<i class="fa fa-plus-square-o" aria-hidden="true"></i>'),
            collectionList.clone().click(addToCollection)
        ),
        $('<td/>', { "class": "releaseTitles" }).text(title),
        $('<td/>', { "class": "releaseArtists" }).text(artist),
        $('<td/>', { "class": "releaseTypes" }).text(type),
        $('<td/>', { "class": "releaseDates" }).text(releaseDate),
        $('<td/>', { "class": "genres" }).text(genres));

    release.click(loadRelease);
    release.attr('data-id', id);

    $('#' + list).append(release);
}

let createSong = (list, id, title, artist, length, favBool, plays) => {
    $('#' + list).append(
        $('<tr></tr>', { "class": 'songRow' }).append(
            $('<td/>', { "class": "fav" }).append(
                $('<input/>', { "type": "checkbox", "class": "heart", "checked": favBool }).click(favorited),
                ($('<label/>', { "class": "container", "class": "heart" }).text('❤'))
            ),
            $('<td/>', { "class": "play" }).append(
                $('<input/>', { "type": "button", "class": "play" }).click(play),
                ($('<label/>', { "class": "container", "class": "play" }).text('▷'))
            ),
            $('<td/>', { "class": "addTo" }).append(
                $('<label/>', { "class": "addTo" }).html('<i class="fa fa-plus-square-o" aria-hidden="true"></i>'),
                collectionList.clone().click(addToCollection)
            ),
            $('<td/>', { "class": "songTitles" }).text(title),
            $('<td/>', { "class": "songArtists" }).text(artist),
            $('<td/>', { "class": "songLengths" }).text(length),
            $('<td/>', { "class": "songPlays" }).text(plays)
        ).attr('data-id', id));
}

let createPlayedSong = (list, id, title, artist, length, playDate, favBool) => {
    $('#' + list).append(
        $('<tr></tr>', { "class": 'playedSongRow' }).append(
            $('<td/>', { "class": "fav" }).append(
                $('<input/>', { "type": "checkbox", "class": "heart", "checked": favBool }).click(favorited),
                ($('<label/>', { "class": "container", "class": "heart" }).text('❤'))
            ),
            $('<td/>', { "class": "play" }).append(
                $('<input/>', { "type": "button", "class": "play" }).click(play),
                ($('<label/>', { "class": "container", "class": "play" }).text('▷'))
            ),
            $('<td/>', { "class": "songPlayDate" }).text(playDate),
            $('<td/>', { "class": "songTitles" }).text(title),
            $('<td/>', { "class": "songArtists" }).text(artist),
            $('<td/>', { "class": "songLengths" }).text(length)
        ).attr('data-id', id));
}

let createArtist = (list, id, name, favBool) => {
    $('#' + list).append(
        $('<tr></tr>', { "class": "artistRow" }).append(
            $('<td/>', { "class": "fav" }).append(
                $('<input/>', { "type": "checkbox", "class": "heart", "checked": favBool }).click(favorited),
                $('<label/>', { "class": "container", "class": "heart" }).text('❤')
            ),
            $('<td/>', { "class": "addTo" }).append(
                $('<label/>', { "class": "addTo" }).html('<i class="fa fa-plus-square-o" aria-hidden="true"></i>'),
                collectionList.clone().click(addToCollection)
            ),
            $('<td/>', { "class": "artistName" }).text(name)).attr('data-id', id));
}

let createFriend = (list, id, name, favBool) => {
    $('#' + list).append(
        $('<tr></tr>', { "class": "friendRow" }).append(
            $('<td/>', { "class": "fav" }).append(
                $('<input/>', { "type": "checkbox", "class": "heart", "checked": favBool }).click(favorited),
                $('<label/>', { "class": "container", "class": "heart" }).text('❤')
            ), $('<td/>', { "class": "friendName" }).text(name)).attr('data-id', id));
}

let createReleaseSong = (id, title, length, track, plays) => {
    $('#releaseSongs').append(
        $('<tr></tr>', { "class": 'releaseSongRow' }).append(
            $('<td/>', { "class": "trackNumber" }).text(track),
            $('<td/>', { "class": "songTitles" }).text(title),
            $('<td/>', { "class": "songLengths" }).text(length),
            $('<td/>', { "class": "songPlays" }).text(plays)).attr('data-id', id));
}

let genreCreate = (id, name) => {
    $('#genreList').append(
        $('<tr></tr>', { "class": "genreRow" }).append(
            $('<td/>', { "class": "genreName" }).text(name)).attr('data-id', id));
}

let createUser = (id, name, favBool) => {
    $('#usersList').append(
        $('<tr></tr>', { "class": "usersRow" }).append(
            $('<td/>', { "class": "fav" }).append(
                $('<input/>', { "type": "checkbox", "class": "heart", "checked": favBool }).click(favorited),
                $('<label/>', { "class": "container", "class": "heart" }).text('❤')
            ), $('<td/>', { "class": "usersName" }).text(name)).attr('data-id', id));
}

let createCollectionItem = (list, id, name, type, rowType) => {
    $('#' + list).append(
        $('<tr></tr>', { "class": rowType }).append(
            // $('<td/>', { "class": "removeWrapper" }).append(
            //     $('<label/>', { "class": "remove" }).html('<i class="fa fa-minus-square-o" aria-hidden="true"></i>').click(removeFromCollection)
            // ),
            $('<td/>', { "class": "collectionItemName" }).text(name),
            $('<td/>', { "class": "collectionItemType" }).text(type)).attr('data-id', id));
}