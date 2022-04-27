// ==UserScript==
// @name         osu! beatconnect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://beatconnect.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=beatconnect.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    async function run() {
        let showInfo = localStorage.getItem("showinfo") || "true";
        let a = window.location.pathname.split('/').pop();

        function isNumeric(value) {
            return /^-?\d+$/.test(value);
        }
        if (!isNumeric(a)) {
            return;
        }

        let result = await fetch(`https://beatconnect.io/search?s=ranked&m=all&p=0&q=${a}`, {
  "headers": {
    "accept": "text/html, */*; q=0.01",
    "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://beatconnect.io/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});

        let text = await result.text();
        let parser = new DOMParser();
        let htmlDocument = parser.parseFromString(text, "text/html");


        localStorage.setItem("showinfo", "false");



        let download = htmlDocument.documentElement.getElementsByClassName('download');
        window.open(`https://beatconnect.io/${download[0].getAttribute('href')}`, '_blank');
        if (showInfo == "true") {
            alert("Allow popups")
            window.open(`https://beatconnect.io/${download[0].getAttribute('href')}`, '_blank');
        }
        window.close();
    }
    // Your code here...
    run();
})();
