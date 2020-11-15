window.onload = function load() {
    $('#detailsPage').hide();
    $('#releaseBack').click(unloadRelease);

    $('#nextPageButton').click(loadNextPage);
    $('#prevPageButton').click(loadPrevPage);
    
    $('#createCollection').click(createNewCollection);
    
    //loadCollections();
    $('#collection').change(changeCollection);
    $('#myModal').click(function(event) {
        if(event.target.id == "collectionCreationName")
        {
            return;
        }
        if(event.target.id == "collectionCreationSubmit")
        {
            let collectionName = $('#collectionCreationName')[0].value;
            let url = API_HOST.concat('/api/users/' + DEFAULT_USERID + '/collections/');
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: collectionName }),
                success: function (data, status) {
                    console.log("status:" + status + " Collection:" + data.collectionID);
                },
                error: function (xhr, status, error) {
                    console.log(status + " " + error + " " + $.parseJSON(xhr.responseText).message);
                },
                complete: function (xhr, status) {
                    console.log("Update Collections");
                    loadCollections();
                    updateCollections();
                }
            });
        }
        $('#myModal').hide();
    });
    updateCollections();
    changeTab("Songs");
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
    });
}