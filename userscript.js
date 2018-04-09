// ==UserScript==
// @name         GaiaOnline Vend Modifications
// @namespace    GaiaOnline Vend Modifications
// @version      1.0
// @description  Multiple Vend Modifications for gaiaonline.com made by jakemadness.
// @author       jakemadness
// @license      GPL
// @match        *://www.gaiaonline.com/*
// @require      https://cdn.rawgit.com/jakemadness/gaiaonline-api/master/gaiaonline.api.js
// @require      https://cdn.rawgit.com/jakemadness/gaiaonline-api/master/gaiaonline.modifications.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
var password = 'myAccountPassword';
window.api   = gaiaonlineApi(password);
window.gaiaonlineModifications(window.api);
