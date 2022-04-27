// ==UserScript==
// @name         osu! First place downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://osu.ppy.sh/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ppy.sh
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let already = JSON.parse(localStorage.getItem("already") || "[]");
    let filteredLinks = [];
    let index = 0;
    let downloadIndex = 0;

    function run() {
        let firstPlaceRoot = document.getElementsByClassName('play-detail-list u-relative');
        let placeRoot;
        for (let i = 0; i < firstPlaceRoot.length; i++) {
            if (firstPlaceRoot[i].previousSibling.innerText.startsWith("Pierwsze miejsca") || firstPlaceRoot[i].previousSibling.innerText.startsWith("First Place Ranks")) {

                placeRoot = firstPlaceRoot[i];
            }
        }
        if (!placeRoot) {
            return;
        }
        let links = placeRoot.getElementsByTagName('a');
        function checkOsuBeatmap(element) { // https://osu.ppy.sh/beatmaps/736729?mode=osu
            if (!element) return false;
            if (!element.getAttribute('href')) return false;
            return element.getAttribute('href').startsWith('https://osu.ppy.sh/beatmaps/');
        }
        for(let i = 0; i < links.length; i++) {
            let link = links[i];
            if (!checkOsuBeatmap(link)) {
                continue;
            }
            let split = link.getAttribute('href').split('/');
            let mapId = split.pop().split('?').shift();
            if (mapId == 'download' || mapId == "download?noVideo=1") {
                continue;
            }
            //link.setAttribute('href', `https://chimu.moe/d/${mapId}`);
            if (filteredLinks.includes(`https://chimu.moe/d/${mapId}`) || already.includes(mapId))
            {
                continue;
            }
            console.log(index);
            filteredLinks[index] = `https://chimu.moe/d/${mapId}`;
            index++;
        }
    }

    var t=setInterval(run,1000);

    function onDownload() {
        if (filteredLinks.length == downloadIndex) {
            alert('No more maps to download');
            return;
        }
        var mapId = filteredLinks[downloadIndex].split('/').pop();
        let nice = window.open(`https://beatconnect.io/${mapId}`);
        downloadIndex++;
        already.push(mapId);
        localStorage.setItem("already", JSON.stringify(already));
    }

    function onClear() {
        localStorage.removeItem('already');
        alert('Downloaded map list cleared');
    }

    function onKeydown(evt) {
        // Use https://keycode.info/ to get keys
        if (evt.keyCode == 39) {
            onDownload();
        }
        if (evt.keyCode == 37) {
            onClear();
        }
    }
    document.addEventListener('keydown', onKeydown, true);
})();