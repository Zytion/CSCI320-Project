window.onload = function load()
{
    $('#detailsPage').hide();
    changeTab("Songs");
    $('#albumBack').click(unloadAlbum);

    $('#nextPageButton').click(loadNextPage);
    $('#prevPageButton').click(loadPrevPage);

}

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    li.addEventListener("click", tabClick);
}

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keypress", searchClick);

const searchBtn = document.querySelector("#searchBtn");
searchBar.addEventListener("click", searchClick);

var pageNum = 1;