// (function() {
//     var d, l, h, j, m, n, k, p = {}.hasOwnProperty;
//     d = {
//         all: ".*",
//         image: ".(jpg|jepg|png|gif|svg)$",
//         video: ".(mov|qt|swf|flv|mpg|mpe|mpeg|mp2v|m2v|m2s|avi|asf|asx|wmv|wma|wmx|rm|ra|ram|rmvb|mp4|3g2|3gp|ogm|mkv)$",
//         audio: ".(mp3|m4a|mpa|ra|wav|wma|aif|iff|mid)$"
//     };
//     this.links = [];
//     this.linksForFilter = {};
//     this.previewAmount = 0;
//     this.previewLinks = {};
//     k = function() {
//         var b, c, a;
//         m();
//         a = [];
//         for (b in d) p.call(d, b) && (c = d[b], this.linksForFilter[b] = h(c, this.links), a.push(n(b)));
//         return a
//     };
//     m = function() {
//         var b, c, a, e;
//         l();
//         this.previewAmount =
//             Math.min(this.links.length, 10);
//         if (0 < this.previewAmount) {
//             chrome.contextMenus.create({
//                 contexts: ["all"],
//                 parentId: "parent",
//                 id: "preview_separator",
//                 type: "separator"
//             });
//             e = [];
//             b = c = 0;
//             for (a = this.previewAmount; 0 <= a ? c < a : c > a; b = 0 <= a ? ++c : --c) this.previewLinks["preview" + b] = this.links[b], e.push(chrome.contextMenus.create({
//                 contexts: ["all"],
//                 parentId: "parent",
//                 id: "preview" + b,
//                 title: this.links[b]
//             }));
//             return e
//         }
//     };
//     l = function() {
//         var b, c, a;
//         if (0 < this.previewAmount) {
//             chrome.contextMenus.remove("preview_separator");
//             b = c = 0;
//             for (a = this.previewAmount; 0 <=
//                 a ? c < a : c > a; b = 0 <= a ? ++c : --c) chrome.contextMenus.remove("preview" + b)
//         }
//         this.previewAmount = 0;
//         return this.previewLinks = {}
//     };
//     h = function(b, c) {
//         var a, e, d, g;
//         g = [];
//         e = 0;
//         for (d = c.length; e < d; e++) a = c[e], a.match(RegExp(b, "i")) && g.push(a);
//         return g
//     };
//     n = function(b) {
//         var c, a;
//         c = this.linksForFilter[b];
//         a = chrome.i18n.getMessage("menu_sub_" + b, [c.length]);
//         return chrome.contextMenus.update(b, {
//             title: a,
//             enabled: 0 < c.length
//         })
//     };
//     j = function(b, c) {
//         return chrome.tabs.create({
//             url: b,
//             index: c.index + 1
//         })
//     };
//     var f;
//     chrome.contextMenus.create({
//         contexts: ["all"],
//         id: "parent",
//         title: chrome.i18n.getMessage("menu_main")
//     });
//     chrome.contextMenus.create({
//         contexts: ["all"],
//         parentId: "parent",
//         id: "all",
//         title: chrome.i18n.getMessage("menu_sub_all")
//     });
//     chrome.contextMenus.create({
//         contexts: ["all"],
//         parentId: "parent",
//         type: "separator"
//     });
//     for (f in d) p.call(d, f) && "all" !== f && chrome.contextMenus.create({
//         contexts: ["all"],
//         parentId: "parent",
//         id: f,
//         title: chrome.i18n.getMessage("menu_sub_" + f)
//     });
//     k();
//     chrome.extension.onMessage.addListener(function(b) {
//         if ("verifySelection" === b.type) return this.links =
//             h(d.all, b.links), k()
//     });
//     chrome.contextMenus.onClicked.addListener(function(b, c) {
//         var a, e, d, g, f;
//         if (a = this.previewLinks[b.menuItemId]) return j(a, c);
//         a = this.linksForFilter[b.menuItemId];
//         if (20 >= a.length || confirm(chrome.i18n.getMessage("selection_alert_tooManyLinks", [a.length]))) {
//             g = a.reverse();
//             f = [];
//             e = 0;
//             for (d = g.length; e < d; e++) a = g[e], f.push(j(a, c));
//             return f
//         }
//     })
// })
// .call(this);