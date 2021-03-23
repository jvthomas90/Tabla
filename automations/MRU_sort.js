(function() {
    'use strict';
    function moveTab$1(id, index, callback) {
        chrome.tabs.move(id, {
            index: index
        }, callback || (() => {}));
    }
    function onTabActivated(callback) {
        chrome.tabs.onActivated.addListener(({
            id
        }) => callback(id));
    }
    function onTabCreated(callback) {
        chrome.tabs.onCreated.addListener((tab) => callback(tab));
    }
    function groupTabs(tabIds, groupId, callback) {
        chrome.tabs.group({
            tabIds,
            groupId
        }, callback);
    }
    function removeTab(ids, callback) {
        chrome.tabs.remove(ids, callback);
    }
    function getAllTabs(callback) {
        chrome.tabs.query({
            currentWindow: true
        }, (tabs) => callback(tabs));
    }
    function getActiveTab(callback) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, ([tab]) => callback(tab || null));
    }
    const defaultDelay = 1;
    const movePinnedTabs = true;
    const maxTabs = 999;
    function getDelay() {
        return localStorage.hasOwnProperty("delay") ?
            parseFloat(localStorage["delay"]) :
            defaultDelay;
    }
    function getMovePinnedTabs() {
        return localStorage.hasOwnProperty("movePinnedTabs") ?
            localStorage["movePinnedTabs"] === "true" :
            movePinnedTabs;
    }
    function getMaxTabs() {
        return localStorage.hasOwnProperty("maxTabs") ?
            parseInt(localStorage["maxTabs"]) :
            maxTabs;
    }
    // This comments are preprocessed and in final browser bundle will appear an appropriate API.
    let timeout;
    const byIndexAsc = (a, b) => a.index - b.index;
    onTabActivated(() => {
        clearTimeout(timeout);
        timeout = setTimeout(triggerTabSlide, getDelay() * 1000);
    });
    onTabCreated((tab) => {
        getActiveTab((activeTab) => { // Opera does not set tab.active immediately onTabCreated
            if (activeTab.id !== tab.id)
                return;
            moveTab(tab);
        });
    });
    function removeOverflownTabs() {
        getAllTabs((tabs) => {
            const maxTabs = getMaxTabs();
            if (tabs.length > maxTabs) {
                const lastTabs = tabs.sort(byIndexAsc)
                    .slice(maxTabs);
                if (lastTabs.length) {
                    removeTab(lastTabs.map(tab => tab.id));
                }
            }
        });
    }
    function moveTab(tab) {
        getAllTabs((tabs) => {
            if (tab.pinned && !getMovePinnedTabs())
                return;
            const pinnedTabs = tabs.filter(tab => tab.pinned);
            if (tab.groupId > 0 && !tab.pinned) {
                // Since Chrome 88; Pinned tabs cannot be in the group.
                // However, the condition above additionally restricts it.
                const groupId = tab.groupId;
                const allTabsInGroup = [tab].concat(
                    tabs.filter(t => t.groupId === tab.groupId && t.id !== tab.id)
                    .sort(byIndexAsc)
                );
                const tabIds = allTabsInGroup.map(tab => tab.id);
                moveTab$1(tabIds, pinnedTabs.length, () => {
                    // Because the group falls apart, it has to be grouped again.
                    groupTabs(tabIds, groupId);
                    removeOverflownTabs();
                });
            } else {
                moveTab$1(tab.id, tab.pinned ? pinnedTabs.length - 1 : pinnedTabs.length, removeOverflownTabs);
            }
        });
    }
    function triggerTabSlide() {
        getActiveTab((tab) => tab && moveTab(tab));
    }
}());