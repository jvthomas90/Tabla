var patterns;
var ignorePrefix;
var disabled;
function addListeners() {
    chrome.tabs.onUpdated.addListener(rearrangeTabs);
    chrome.tabs.onAttached.addListener(rearrangeTabs);
    chrome.tabs.onCreated.addListener(rearrangeTabs);
    chrome.storage.onChanged.addListener(function(changes) {
        if (changes.hasOwnProperty('patterns')) {
            patterns = changes['patterns']['newValue'];
        }
        if (changes.hasOwnProperty('disabled')) {
            disabled = changes['disabled']['newValue'];
        }
        rearrangeTabs();
    });
}
function loadPatterns() {
    chrome.storage.sync.get({
        'patterns': [],
        'ignorePrefix': ''
    }, function(items) {
        patterns = items['patterns'];
        if (items['ignorePrefix'] !== '') {
            ignorePrefix = RegExp(items['ignorePrefix']);
        } else {
            ignorePrefix = null;
        }
    });
}
function loadDisabledState() {
    chrome.storage.sync.get({
        'disabled': false
    }, function(items) {
        disabled = items['disabled'];
    });
}
function rearrangeTabs() {
    if (disabled) {
        return;
    }
    chrome.tabs.query({
        currentWindow: true
    }, function(tabs) {
        // We can't move anything to the left of the pinned
        // tabs, so figure out how many there are, that is
        // our left-most target index.
        var targetIndex = tabs.reduce(function(count, tab) {
            if (tab.pinned) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            var patternTabs = tabs.filter(function(tab) {
                // Ignore pinned tabs since we can't move
                // them anyway and we already accounted
                // for them above.
                if (tab.pinned) {
                    return false;
                }
                if (tab.inPosition === true) {
                    return false;
                }
                return tab.url.match(pattern);
            });
            patternTabs.sort(function(leftTab, rightTab) {
                var left = leftTab.title.replace(ignorePrefix, '');
                var right = rightTab.title.replace(ignorePrefix, '');
                // We can't allow ties, so we sort first on title, then on ID,
                // then, finally, on current index. ID should only be the same
                // for special windows like apps and devtools.
                if (left < right) {
                    return -1;
                }
                if (left === right) {
                    if (leftTab.id < rightTab.id) {
                        return -1;
                    }
                    if (leftTab.id === rightTab.id) {
                        if (leftTab.index < rightTab.index) {
                            return -1;
                        }
                        if (leftTab.index > rightTab.index) {
                            return 1;
                        }
                    }
                    if (leftTab.id > rightTab.id) {
                        return 1;
                    }
                }
                if (left > right) {
                    return 1;
                }
            });
            for (var j = 0; j < patternTabs.length; j++) {
                var tab = patternTabs[j];
                tab.inPosition = true;
                if (tab.index != targetIndex) {
                    chrome.tabs.move(tab.id, {
                        index: targetIndex++
                    });
                } else {
                    targetIndex += 1;
                }
            }
        }
    });
}
loadPatterns();
loadDisabledState();
addListeners();