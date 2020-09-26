let loadtime = 1000;

let tabClick = (e) => {
    load();
    setTimeout(() => {
        changeTab(e.target.dataset.tab);
    }, loadtime / 2);
}


let small = document.querySelector("#tabs small");
function changeTab(tab)
{
    small.innerHTML = "Showing " + tab + " by name";
}

function load() {
    document.querySelector("#loadingTop").className = "load";
    document.querySelector("#loadingBot").className = "load";

    setTimeout(() => {
        document.querySelector("#loadingTop").className = "unload";
        document.querySelector("#loadingBot").className = "unload";

        setTimeout(() => {
            document.querySelector("#loadingTop").className = "reset";
            document.querySelector("#loadingBot").className = "reset";
        }, loadtime);

    }, loadtime);
}

const tabs = document.querySelectorAll("#tabs li");
for (let li of tabs) {
    li.addEventListener("click", tabClick);
}