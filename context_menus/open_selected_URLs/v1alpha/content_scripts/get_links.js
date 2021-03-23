(function() {
    var h;
    h = [/^mailto\:/i, /^javascript/i];
    var j = window,
        f = function(b, a) {
            this.html = b;
            this.selection = a;
            this.links = {}
        };
    f.fromSelection = function(b) {
        var a, c, e, d, g;
        a = function(a, b, c) {
            return a.appendChild(b.getRangeAt(c)
                .cloneContents())
        };
        c = document.createElement("div");
        e = d = 0;
        for (g = b.rangeCount; 0 <= g ? d < g : d > g; e = 0 <= g ? ++d : --d) a(c, b, e);
        return new f(c, b.toString())
    };
    f.fromHTMLString = function(b) {
        var a;
        a = document.createElement("div");
        a.innerHTML = b;
        return new f(a, a.innerText)
    };
    f.prototype.allLinks = function() {
        this.gatherHTMLLinks();
        this.gatherPlainLinks();
        return this.createLinkList()
    };
    f.prototype.gatherHTMLLinks = function() {
        var b, a, c, e, d;
        b = this.html.getElementsByTagName("a");
        d = [];
        c = 0;
        for (e = b.length; c < e; c++) a = b[c], a.href && !this.onBlackList(a.href) && d.push(this.links[a.href] = !0);
        return d
    };
    f.prototype.onBlackList = function(b) {
        var a, c, e;
        c = 0;
        for (e = h.length; c < e; c++)
            if (a = h[c], b.match(a)) return !0;
        return !1
    };
    f.prototype.gatherPlainLinks = function() {
        var b, a, c, e, d;
        if (a = this.selection.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
            d = [];
            c = 0;
            for (e = a.length; c < e; c++) b = a[c], d.push(this.links[b] = !0);
            return d
        }
    };
    f.prototype.createLinkList = function() {
        var b, a;
        a = [];
        for (b in this.links) a.push(b);
        return a
    };
    j.LinkGrabber = f
})
.call(this);