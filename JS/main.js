window.onload = function load()
{
    $('#detailsPage').hide();
    changeTab("Songs");
    $('#albumBack').click(unloadAlbum);
}

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    li.addEventListener("click", tabClick);
}