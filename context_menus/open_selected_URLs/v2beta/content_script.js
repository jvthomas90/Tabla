//global variables
var a = document.querySelectorAll("a[href]"),
    links = [],
    tablaEnabled = true,
    i,
    l;
// makes red border for selected links, add link to links array
function ahendler(event) {
    if (!(tablaEnabled)) return;
    if (event.shiftKey) {
        var elIndex = links.indexOf(this);
        if (elIndex === -1) {
            links.push(this);
            this.originalStyle = this.style.cssText;
            this.style.border = "1px solid red";
            this.addEventListener("click", opener, false);
        } else { // on even mouseover for the same link undo style changes, removes from links array
            links.splice(elIndex, 1);
            this.style.cssText = this.originalStyle;
            this.removeEventListener("click", opener, false);
        }
        chrome.runtime.sendMessage({ //change counter
            counter: links.length
        });
    }
}
// after clicking any red framed links opens all links in separate windows, remove all styles and event listener
function opener(event) {
    event.preventDefault();
    var hrefs = [],
        i,
        l;
    for (i = 0, l = links.length; i < l; i++) {
        links[i].style.cssText = links[i].originalStyle;
        links[i].removeEventListener("click", opener, false);
        hrefs.push(links[i].href);
    }
    links = [];
    chrome.runtime.sendMessage({
        links: hrefs
    });
    return false;
}
for (i = 0, l = a.length; i < l; i++) {
    a[i].addEventListener("mouseover", ahendler, true);
}