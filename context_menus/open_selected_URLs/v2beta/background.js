var tablaEnabled;
function counter(n, id) {
    chrome.browserAction.setBadgeText({
        text: n,
        tabId: id
    })
}
function execCode(obj, bin, num, tabId) {
    chrome.tabs.executeScript(obj);
    tablaEnabled = bin;
    counter(num, tabId);
}
chrome.browserAction.onClicked.addListener(
    function(tab) {
        if (tablaEnabled === undefined) {
            execCode({
                file: "content_script.js"
            }, true, "0", tab.id);
            return;
        }
        else if (!(tablaEnabled)) {
            execCode({
                code: "tablaEnabled = true;"
            }, true, "0", tab.id);
        } else {
            execCode({
                code: "tablaEnabled = false;"
            }, false, "", tab.id);
        }
    });
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.links) {
            for (var i = 0, l = request.links.length; i < l; i++) {
                chrome.tabs.create({
                    url: request.links[i],
                    active: false
                });
            }
            counter("0", sender.tab.id);
        }
        if (request.hasOwnProperty("counter")) {
            counter(request.counter.toString(), sender.tab.id);
        }
    });