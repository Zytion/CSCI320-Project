window.onload = function load()
{
    $('#detailsPage').hide();
    changeTab("Songs");
    $('#releaseBack').click(unloadRelease);

    $('#nextPageButton').click(loadNextPage);
    $('#prevPageButton').click(loadPrevPage);
    //loadCollections();
    $('#collection').change(changeCollection);
}

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    if(li.id == "")
        li.addEventListener("click", tabClick);
}

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keypress", searchClick);

const searchBtn = document.querySelector("#searchBtn");
searchBar.addEventListener("click", searchClick);

var pageNum = 1;

let loadCollections = () => {
    let url = API_HOST.concat('/api/collections/');

    $.getJSON(url, function (data) {
        $.each(data.collections, function (i, collection) {
            $('#collection').append(
                $('<option></option>', {"value": collection.collectionID}).text(collection.name)
                );
        });
    });
}