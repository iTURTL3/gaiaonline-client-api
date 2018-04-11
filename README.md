# GaiaOnline Client API
GaiaOnline Client API works by including the script on the <b>gaiaonline.com</b> website (preferably in a userscript) then calling its functions. I made this API in 2015 but it still works exceptionally well in 2018.

# Userscripts Using This API
**vend script:** https://greasyfork.org/en/scripts/40448-gaiaonline-vend-modifications

## Getting Started
include both gaiaonline.utilities.js and gaiaonline.api.js files on the gaiaonline website. Once you've included those files on the website you can create an instance of the API like the following example:

```JS
var password     = 'my account password';
window.utilities = new window.gUtilities();
window.api       = new window.gApi(utilities, password);
```

## API Functions
**Create a hashed password + nonce chap:**
```JS
console.log('your chap is ' + window.api.createChap(nonce));
```
**Generate a nonce:**
```JS
window.api.useNonce(function(nonce) {
   console.log('your generated nonce is ' + nonce + '!');
});
```
**Use gsi methods:**
```JS
window.api.gsi(methods, function(data) {
   console.log('gsi data: ', data);
});
```
**Create a vend:**
```JS
window.api.createVend(itemId, itemSerial, days, hours, minutes, price, function() {
   console.log('vend created!');
}, function() {
   console.log('unable to create vend!');
});
```
**Cancel a vend:**
```JS
window.api.cancelVend(vendId, function() {
   console.log('vend canceled!');
}, function() {
   console.log('unable to cancel vend!');
});
```
**Cancel all vends:**
```JS
window.api.cancelAllVends(function() {
   console.log('all vends have been canceled!');
}, function() {
   console.log('unable to cancel all vends!');
});
```
**Buy a vend with gold/plat:**
```JS
window.api.buyVendWithGold(storeId, vendId, function() {
   console.log('vend bought with gold!');
}, function() {
   console.log('unable to buy vend with gold!');
});
```
**Buy a vend with gCash:**
```JS
window.api.buyVendWithGcash(storeId, vendId, function() {
   console.log('vend bought with Gcash!');
}, function() {
   console.log('unable to buy vend with Gcash!');
});
```
**Bid on a vend with gold/plat:**
```JS
window.api.bidOnVend(storeId, vendId, bidAmount, function() {
   console.log('bid placed on vend!');
}, function() {
   console.log('unable to place bid on vend!');
});
```
**Create a trade:**
```JS
window.api.createTrade(username, function() {
   console.log('trade created!');
}, function() {
   console.log('unable to create trade!');
});
```
**Edit your store:**
```JS
window.api.editStore(bbCode, function() {
   console.log('store edited!');
}, function() {
   console.log('unable to edit store!');
});
```
**Gift an item from a store using gold/plat:**
```JS
window.api.giftStoreItem(storeId, itemId, itemName, itemPrice, itemQuantity, recipientId, function() {
   console.log('store item gifted!');
}, function() {
   console.log('unable to gift store item!');
});
```
**Use special item from inventory:**
```JS
window.api.useSpecialItem(itemSerial, itemOption, function() {
   console.log('special item used!');
}, function() {
   console.log('unable to use special item!');
});
```
**Craft an alchemy formula:**
```JS
window.api.craftFormula(formulaId, formulaPath, function() {
   console.log('formula crafted!');
}, function() {
   console.log('unable to craft formula!');
});
```
**Claim daily candy:**
```JS
window.api.dailyCandy(candyId, function() {
   console.log('daily candy claimed!');
}, function() {
   console.log('unable to claim daily candy!');
});
```
**Claim daily treat:**
```JS
window.api.dailyTreat(treatType, function() {
   console.log('daily treat claimed!');
}, function() {
   console.log('unable to claim daily treat!');
});
```
**Get an item from dumpster diving:**
```JS
window.api.dumpsterDive(function() {
   console.log('item received from dumpster!');
}, function() {
   console.log('unable to receive item from dumpster!');
});
```
**Add an item to wishlist:**
```JS
window.api.addItemToWishlist(itemId, function() {
   console.log('item added to wishlist!');
}, function() {
   console.log('unable to add item to wishlist!');
});
```
**Check how many of an item you own:**
```JS
window.api.itemQuantity(itemId, function(quantity) {
   console.log('you own ' + quantity + ' of this item!');
}, function() {
   console.log('you own 0 of this item!');
});
```
**The user id of the account you're using:**
```JS
window.api.userId(function(userId) {
   console.log('current user id is ' + userId + '!');
}, function() {
   console.log('unable to get current user id!');
});
```
**Gold amount:**
```JS
window.api.goldAmount(function(gold) {
   console.log('you have ' + gold + ' gold!');
}, function() {
   console.log('unable to get gold amount!');
});
```
**Gcash amount:**
```JS
window.api.gCashAmount(function(cash) {
   console.log('you have ' + cash + ' Gcash!');
}, function() {
   console.log('unable to get Gcash amount!');
});
```

## Known Function Arguments
**known daily candy ids:** <p>1, 2, 3, 4, 5, 8, 12, 1271, 1279</p>
**known daily treat types:** <p>home, mygaia, market, forum, games</p>
**known achievement ids:** <p>1, 2, 3, 4, 5, 6, 7, 11, 16, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1015, 1017, 1018, 1021, 1022, 1023, 1024, 1025, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1052, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2027, 2029, 2030, 2031, 2033, 2034, 2035, 2036, 2046, 2048, 2050, 2052, 2054, 2056, 2058, 2060, 2062, 2064, 2066, 2068, 2070, 2072, 2074, 2076, 3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 4001, 4002, 4003, 4600, 4602, 4604, 4606, 4608, 4610, 4612, 4614, 4616, 4618, 5000, 6000, 7000, 7002, 7004, 7006, 7008, 7010, 7012, 7014, 7016, 7018, 7020, 7022, 7024, 7026, 7028, 7030, 7032, 7034, 7036, 7038, 7040, 7042, 7044, 7046, 7048, 7050, 7052, 7054, 7056, 7058, 7060, 7500, 7502, 7504, 7506, 7508, 7510, 7512, 7514, 7516, 8000, 8100, 8200, 8300, 8400, 8500, 8502, 8504, 8506, 8508, 8510, 9000, 9001, 9002, 9003, 9010, 9011, 9012, 9015, 9016, 9020, 9030, 9031, 9032, 9034, 9040, 9041, 9042, 9043, 9046, 9048, 9050, 9052, 9054, 9056, 9058, 9060, 9062, 9064, 9066, 9068, 9070, 9072, 9074, 9076, 9078, 9080, 9082, 9084, 9086, 9088, 9090, 9092, 9094, 9096, 9098, 9100, 9102, 9104, 9106, 9108, 9110, 9112, 9114, 9116, 9118, 9120, 9122, 10000, 10002, 10004, 10006, 10007, 10009, 10011, 10013, 10015, 10017, 10019, 10021, 10023, 10025, 10026, 10028, 10030, 10032, 10034, 10036, 10038, 10040, 10042, 10044, 10046, 10048, 10050, 10052, 10054, 10056, 10058, 10060, 10062, 10064, 10066, 10068, 10070, 10072, 10074, 10076, 10078, 10080, 10082, 10084, 10086, 10090, 10092, 10094, 10096, 10098, 10100, 10102, 10103, 10105, 10107, 10109, 10111, 10113, 10115, 10117, 10119, 10121, 10123, 10125, 10127, 10129, 10131, 10133, 10135, 10137, 10139, 10141, 10143, 10145, 10147, 10149, 10151, 10153, 10155, 10157, 10159, 10161, 10163, 10165, 10167, 10169, 10171, 10173, 10175, 10177, 10179, 10181, 10183, 10185, 10187, 10189, 10191, 10193, 10195, 10197, 10199, 10201, 10203, 10205, 10207, 10209, 10211, 10213, 20001, 20003, 20005, 20007, 20009, 20011, 20013, 20015, 20017, 20019, 20021, 20023, 20025, 20027, 20029, 20031, 20033, 20035, 20037, 20039, 20041, 20043, 20045, 20047, 20049, 20051, 20053, 20055, 20057, 20059, 20061, 20063, 20065, 20067, 20069, 20071, 20073, 20075, 20077, 20079, 20081, 20083, 20085, 20087, 20089, 20091, 20093, 20095, 20097, 20099, 20101, 20103, 20107, 20109, 20111, 20113, 20115, 20117, 20119, 20121, 20123, 20125, 20127, 20129, 20131, 20133, 20135, 20137, 20139, 20141, 20143, 20145, 20147, 20149, 20151, 20153, 20155, 20157, 20159, 20161, 20162, 20163, 20167, 20169, 20171, 20173, 20175, 20177, 20179, 20185, 20187, 20189, 20191, 20193, 20195, 20197, 20199, 20201, 20203, 20205, 20207, 20209, 20211, 20213, 20215, 20217, 20219, 20221, 20223, 20225, 20227, 20229, 20231, 20233, 20235, 20237, 20239, 20241, 20243, 20245, 20247, 20249, 20251, 20253, 20255, 20257, 20259, 20261, 20263, 20265, 20267, 20269, 20271, 20273, 20275, 20277, 20279, 20281, 20283, 20285, 20287, 20289, 20291, 20292, 20295, 20297, 20299, 20301, 20303, 20305, 20307, 20309, 20311, 20313, 20315, 20317, 20319, 20321, 20323, 20325, 20327, 20329, 20331, 20333, 20335, 20337, 20339, 20341, 20343, 20345, 20347, 20349, 20351, 20355, 20357, 20359, 20361, 20363, 20365, 20367, 20369, 20371, 20373, 20375, 20377, 20379, 20381, 20383, 20385, 20387, 20389, 20391, 20393, 20395, 20397, 20399, 20401, 20405, 20406, 20408, 20410, 20412, 20414, 20416, 20418, 20420, 20422, 20424, 20426, 20428, 20430, 20432, 20434, 20436, 20438, 20440, 20442, 20444, 20446, 20448, 20450, 20452, 20454, 20456, 20458, 20460, 20462, 20464, 20466, 20468, 20470, 20472, 20474, 20476, 20478, 20480, 20482, 20484, 20486, 20488, 20490, 20492, 20494, 20496, 20498, 20500, 20502, 20504, 20506, 20508, 20510, 20512, 20514, 20516, 20518, 20520, 20522, 20524, 20526, 20528, 20530, 20532, 20534, 20536, 20538, 20540, 20542, 20544, 20546, 20548, 20550, 20552, 20554, 20556, 20558, 20560, 20562, 20564, 20566, 20568, 20570, 50540, 50542, 50544, 50546, 50548, 50550, 50552, 50554, 50556, 50558, 50560, 50562, 50564, 50566, 50568, 50570, 50572, 50574, 50576, 50578, 50580, 50582, 50584, 50586, 50588, 50590, 50592, 50594, 50596, 50598, 50600, 50602, 50604, 50606, 50608, 50610, 50612, 50614, 50616, 50618, 50620, 50622, 50624, 50626, 50628, 50630, 50632, 50634, 50636, 50638, 50640, 50642, 50644, 50646, 50648, 50650, 50652, 50654, 50656, 50658, 50660, 50662, 50664, 50666, 50668, 50670, 50672, 50674, 50676, 50678, 50680, 50682</p>

## Author
github: https://github.com/jakemadness  
gaiaonline: https://www.gaiaonline.com/gsearch/users/jakemadness  
youtube: https://www.youtube.com/channel/UCQ-V2VrQawc8Xi6b_mH8Law  
