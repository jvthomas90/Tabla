(function() {
    var a;
    document.body.onmouseup = function() {
        return window.setTimeout(function() {
            return chrome.extension.sendMessage({
                type: "verifySelection",
                links: a()
            })
        }, 0)
    };
    document.body.onkeyup = function() {
        return chrome.extension.sendMessage({
            type: "verifySelection",
            links: a()
        })
    };
    a = function() {
        var a;
        a = window.getSelection();
        return LinkGrabber.fromSelection(a)
            .allLinks()
    }
})
.call(this);