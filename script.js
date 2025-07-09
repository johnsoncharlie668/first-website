const listItems = document.querySelectorAll("li");

function toggleDone(event) {
    if (!event.target.className) {
        event.target.className = "done";
    }
    else {
        event.target.className = ""
    }
}

listItems.forEach((item) => {
    item.addEventListener("click", toggleDone)
});