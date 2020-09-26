let tabClick = (e) => {
    changeTab(e.target.dataset.tab);
}

let small = document.querySelector("#tabs small");
function changeTab(tab) {
    small.innerHTML = "Showing " + tab + " by name";
    switch(tab)
    {
        case "Artists":
            break;
        case "Albums":
            break;
        case "Genres":
            break;
        case "Playlists":
            break;
        case "Data":
            break;
    }
}

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    li.addEventListener("click", tabClick);
}