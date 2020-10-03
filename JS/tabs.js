let tabClick = (e) => {
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

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    li.addEventListener("click", tabClick);
}

let loadAlbums= () => {
    $('#albumList').empty();
    var i;
    for(i = 0; i < 10; i++)
        createAlbum("Files/testcover.jpg", "testing" + i, "tester");
}

let loadSongs = () => {
    $('#songList').empty();
    $('#songList').append(
    "<tr><th/> <th>Title</th> <th>Artist</th>" + 
    "<th>Album</th> <th>Genre</th>" + 
    "<th>Length</th> <th>Release Date</th> </tr>");
    var i;
    for(i = 0; i < 10; i++)
        createSong("title" + i, "artest" + i, "album", "rock", "20:20", "1000 AD");
}