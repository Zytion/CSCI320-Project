window.onload = function load()
{
    changeTab("Songs");
}

let small = document.querySelector("#tabs small");
let pages = document.querySelectorAll("main > *")
const tabs = document.querySelectorAll("#tabs li");

let tabClick = (e) => {
    for(let li of tabs)
    {
        li.className = "";
        if(li.dataset.tab == e.target.dataset.tab)
            li.className = "active";
    }
    changeTab(e.target.dataset.tab);
}

function changeTab(tab) {
    pages.forEach(element => {
        element.className = "hidden";
    });

    small.innerHTML = "Creating " + tab;
    switch(tab)
    {
        case "Songs":
            pages[0].className = "";
            break;
        case "Artists":
            pages[1].className = "";
            break;
        case "Albums":
            pages[2].className = "";
            break;
        case "Genres":
            pages[3].className = "";
            break;
    }
}

for (let li of tabs) {
    li.addEventListener("click", tabClick);
}