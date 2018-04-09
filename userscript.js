// ==UserScript==
// @name         GaiaOnline Vend Modifications
// @namespace    GaiaOnline Vend Modifications
// @version      1.0
// @description  Multiple Vend Modifications for gaiaonline.com made by jakemadness.
// @author       jakemadness
// @license      GPL
// @match        *://www.gaiaonline.com/*
// @require      https://cdn.rawgit.com/jakemadness/gaiaonline-api/2f69a11184bf31cf85f7bf85d148298ca9426d22/gaiaonline.api.js
// @require      https://cdn.rawgit.com/jakemadness/gaiaonline-api/541bce8ee2383f39ed3826c187a820d80b43007a/userscript.modifications.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
var password = 'myAccountPassword';
window.api   = gaiaonlineApi(password);
window.userscriptModifications(window.api);
