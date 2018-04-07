# GaiaOnline Client API
GaiaOnline Client API works by including the script on the <b>gaiaonline.com</b> website (preferably in a userscript) then calling its functions. I made this API in 2015 but it still works exceptionally well in 2018.

## Getting Started
create an instance of the api by passing your account password as the first argument.
```JS
window.api = window.gaiaonlineApi('myAccountPassword');
```

## Public API Functions
**Create a vend:**
```JS
window.api.createVend(itemId, itemSerial, days, minutes, seconds, price, function() {
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
**Create a trade with another user:**
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
**Use a special item in your inventory:**
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
}, function(quantity) {
   console.log('unable to craft formula!');
});
```
**Claim a daily candy:**
> known daily candy ids: 1, 2, 3, 4, 5, 8, 12, 1271, 1279
```JS
window.api.dailyCandy(candyId, function() {
   console.log('daily candy claimed!');
}, function() {
   console.log('unable to claim daily candy!');
});
```
**Claim a daily treat:**
> known daily treat types: home, mygaia, market, forum, games
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
~~**Award a user an achievement:**~~
```JS
window.api.awardAchievement(userId, achievementId, function() {
   console.log('achievement awarded!');
}, function(quantity) {
   console.log('unable to award achievement!');
});
```
**Check how many of an item you own:**
```JS
window.api.itemQuantity(itemId, function(quantity) {
   console.log('you own ' + quantity + ' of this item!');
}, function(quantity) {
   console.log('you own 0 of this item!');
});
```
**The user id of the account you're using:**
```JS
window.api.userId(function(userId) {
   console.log('current user id is ' + userId + '!');
}, function(quantity) {
   console.log('unable to get current user id');
});
```

## Non-Public API Functions
**Award a user an achievement**
<p>This function is not public because it would be abused example of function results: https://www.gaiaonline.com/achievements/public/37043881</p>
