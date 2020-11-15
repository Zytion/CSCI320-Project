window.onload = function load() {
    $('#detailsPage').hide();
    $('#releaseBack').click(unloadRelease);

    $('#nextPageButton').click(loadNextPage);
    $('#prevPageButton').click(loadPrevPage);

    updateCollections();

    //loadCollections();
    $('#collection').change(changeCollection);
}

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    if (li.id == "")
        li.addEventListener("click", tabClick);
}

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keypress", searchClick);

const searchBtn = document.querySelector("#searchBtn");
searchBar.addEventListener("click", searchClick);

var pageNum = 1;

let collectionList;

let updateCollections = () => {
    collectionList = $('<div></div>', { "class": "dropdown-content" });

    $.getJSON(API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/'), function (data) {
        if (data.collections.length != 0) {
            $.each(data.collections, function (i, collection) {
                collectionList.append(
                    $('<p></p>', {'class' : "addTo"}).text(collection.name).attr('data-id', collection.collectionID));
            });
        }
    }).then(function () {
        changeTab("Songs");
    });
}