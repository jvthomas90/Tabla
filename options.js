function saveOptions() {
    var obj = {}
    obj[this.id] = this.checked
    chrome.storage.sync.set(obj)
}
function restore_options() {
    chrome.storage.sync.get({
        disableWhileInTextbox: true, //default values here
        keepFocusWhenPinning: true,
        unpinToOriginalPos: true,
        enableShiftSpace: true,
        enableShiftDown: true,
        enableShiftRightLeft: true,
        enableMoveWindowRightLeft: true,
        enableResizeWindow: true,
        shrinkPercentage: 25
    }, function(items) {
        var chkBoxes = document.getElementsByName("options")
        var shrinkbox = document.getElementById('shrinkpercentage')
        for (var i = 0; i < chkBoxes.length; i++) {
            var chkBox = chkBoxes[i]
            chkBox.addEventListener('click', saveOptions)
            chkBox.checked = items[chkBox.id]
            if (chkBox.id == "enableResizeWindow") {
                chkBox.addEventListener('click', toggleShrinkBox)
            }
        }
        if (items['enableResizeWindow']) {
            shrinkbox.value = items['shrinkPercentage']
        } else {
            shrinkbox.disabled = true
        }
        shrinkbox.addEventListener("keypress", validateKeyPress)
        shrinkbox.addEventListener("keyup", saveShrinkPercentage)
        shrinkbox.addEventListener("paste", function(e) {
            e.preventDefault()
        }) // don't allow pasting into textbox
        shrinkbox.addEventListener("blur", function(e) {
            if (shrinkbox.value.length == 0) {
                shrinkbox.value = items['shrinkPercentage']
            }
        })
    });
}
function toggleShrinkBox(e) {
    var shrinkbox = document.getElementById('shrinkpercentage')
    if (e.srcElement.checked) {
        shrinkbox.disabled = false
        chrome.storage.sync.get({
            shrinkPercentage: 25
        }, function(items) {
            shrinkbox.value = items['shrinkPercentage']
        })
    } else {
        shrinkbox.disabled = true
        shrinkbox.value = ""
    }
}
function validateKeyPress(e) {
    var shrinkBox = document.getElementById('shrinkpercentage')
    var unicode = e.charCode ? e.charCode : e.keyCode
    var curVal = shrinkBox.value
    if (unicode != 8) { // if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) { // if not a number
            e.preventDefault()
            return
        }
    }
    if (shrinkBox.selectionStart == 0 && shrinkBox.selectionEnd == 2) {
        shrinkBox.value = String.fromCharCode(event.which)
    } else if (shrinkBox.selectionStart == 0 && shrinkBox.selectionEnd == 1) {
        shrinkBox.value = String.fromCharCode(event.which)
        if (curVal.length == 2) {
            shrinkBox.value = shrinkBox.value + curVal[1]
        }
    } else if (shrinkBox.selectionStart == 1 && shrinkBox.selectionEnd == 2) {
        shrinkBox.value = curVal[0] + String.fromCharCode(event.which)
    }
    if (curVal.length == 2) {
        e.preventDefault()
    }
}
function saveShrinkPercentage(e) {
    var saveVal = document.getElementById('shrinkpercentage')
        .value
    if (saveVal.length == 0) {
        return
    }
    chrome.storage.sync.set({
        shrinkPercentage: saveVal
    })
}

document.addEventListener('DOMContentLoaded', restore_options)

/* "Tab automation" stuff */

// significant/semi-permanent "pseudo-pinned" tabs
var defaultPatterns = [
    '^https://github.com',
    '^https://gist.github.com'
];
var currentPatternsContent;
var currentIgnorePrefix;
function loadPatterns() {
    var patternsBox = document.getElementById('patterns');
    chrome.storage.sync.get({
        'patterns': []
    }, function(items) {
        var patterns = items['patterns'];
        if (patterns.length == 0) {
            patternsBox.value = defaultPatterns.join('\r\n');
        } else {
            patternsBox.value = patterns.join('\r\n');
        }
        currentPatternsContent = patternsBox.value;
    });
    // Ignore prefix
    var ignorePrefixBox = document.getElementById('ignore-prefix');
    chrome.storage.sync.get({
        'ignorePrefix': ''
    }, function(items) {
        var ignorePrefix = items['ignorePrefix'];
        ignorePrefixBox.value = ignorePrefix;
        currentIgnorePrefix = ignorePrefixBox.value;
    });
}
function savePatterns() {
    var patternsBox = document.getElementById('patterns');
    var patterns = patternsBox.value.split('\n')
        .map(function(p) {
            return p.trim();
        })
        .filter(function(p) {
            return p != '';
        });
    chrome.storage.sync.set({
        'patterns': patterns
    });
    currentPatternsContent = patternsBox.value;
    patternsBox.style.background = '';
    // Ignore prefix
    var ignorePrefixBox = document.getElementById('ignore-prefix');
    var ignorePrefix = ignorePrefixBox.value;
    chrome.storage.sync.set({
        'ignorePrefix': ignorePrefix
    });
    currentIgnorePrefix = ignorePrefixBox.value;
    ignorePrefixBox.style.background = '';
}
function resetStorage() {
    chrome.storage.sync.clear(loadPatterns);
    chrome.storage.local.clear(loadDisabledState);
}
function loadDisabledState() {
    var disabledCheck = document.getElementById('disabled');
    chrome.storage.local.get({
        'disabled': false
    }, function(items) {
        var disabled = items['disabled'];
        disabledCheck.checked = disabled;
    });
}
function saveDisabledState() {
    var disabledCheck = document.getElementById('disabled');
    chrome.storage.local.set({
        'disabled': disabledCheck.checked
    });
}
document.addEventListener('DOMContentLoaded', function() {
    loadPatterns();
    loadDisabledState();
    var saveButton = document.getElementById('save');
    saveButton.addEventListener('click', savePatterns);
    var reloadButton = document.getElementById('reload');
    reloadButton.addEventListener('click', loadPatterns);
    var resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetStorage);
    var helpToggle = document.getElementById('help-toggle');
    helpToggle.addEventListener('click', function() {
        var helpSection = document.getElementById('help');
        if (helpSection.style.display == '') {
            helpSection.style.display = 'block';
        } else {
            helpSection.style.display = '';
        }
    });
    var disabledCheck = document.getElementById('disabled');
    disabledCheck.addEventListener('change', saveDisabledState);
    var patternsBox = document.getElementById('patterns');
    patternsBox.addEventListener('input', function(e) {
        if (e.target.value != currentPatternsContent) {
            e.target.style.background = '#ffeeee';
        } else {
            e.target.style.background = '';
        }
    });
    var ignorePrefixBox = document.getElementById('ignore-prefix');
    ignorePrefixBox.addEventListener('input', function(e) {
        if (e.target.value != currentIgnorePrefix) {
            e.target.style.background = '#ffeeee';
        } else {
            e.target.style.background = '';
        }
    });
});

// MRU automation

function MRU() {
    'use strict';
    const defaultDelay = 1;
    const movePinnedTabs = true;
    const maxTabs = 999;
    function getDelay() {
        return localStorage.hasOwnProperty("delay") ?
            parseFloat(localStorage["delay"]) :
            defaultDelay;
    }
    function setDelay(number) {
        return localStorage["delay"] = number > 0.1 ? number : 0.1;
    }
    function getMovePinnedTabs() {
        return localStorage.hasOwnProperty("movePinnedTabs") ?
            localStorage["movePinnedTabs"] === "true" :
            movePinnedTabs;
    }
    function setMovePinnedTabs(boolean) {
        return localStorage["movePinnedTabs"] = !!boolean;
    }
    function getMaxTabs() {
        return localStorage.hasOwnProperty("maxTabs") ?
            parseInt(localStorage["maxTabs"]) :
            maxTabs;
    }
    function setMaxTabs(number) {
        return localStorage["maxTabs"] = Math.max(2, +number);
    }
    window.addEventListener("load", () => {
        const delayElement = document.getElementById("delay");
        const maxTabsElement = document.getElementById("maxTabs");
        const movePinnedTabsElement = document.getElementById("movePinnedTabs");
        delayElement.value = getDelay();
        maxTabsElement.value = getMaxTabs();
        movePinnedTabsElement.checked = getMovePinnedTabs();
        delayElement.addEventListener("change", ({
            target
        }) => {
            target.value = setDelay(target.value);
        });
        maxTabsElement.addEventListener("change", ({
            target
        }) => {
            target.value = setMaxTabs(target.value);
        });
        movePinnedTabsElement.addEventListener("change", ({
            target
        }) => {
            target.checked = setMovePinnedTabs(target.checked);
        });
    });
};
function MRUtoggle(){
    const MRUenable = document.getElementById("MRUlimit")
    if (MRUenable.checked) {
        MRU()
    }
};
MRUtoggle();