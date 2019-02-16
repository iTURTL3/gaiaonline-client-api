# GaiaOnline Client API
GaiaOnline Client API works by requiring the package in your NodeJS file then calling its functions. I made this API in 2015 but it still works exceptionally well in 2019. (This used to be a browser script but has been converted to NodeJS)

## Dependencies
```
npm install request
npm install md5
```

## Getting Started
Require the gaiaonline.api.js module and create an instance of the API like the following example:

```JS
var cookies  = 'gaiaonline cookies here';
var password = 'gaiaonline password here';
var api      = new (require('./gaiaonline.api.js'))(cookies, password);
```

## API Functions
All API functions that need a nonce or hashed password + nonce chap will create them internally so all you need to pass is the function arguments and an optional success function and optional error function.

**Create a vend:**
```JS
api.createVend(itemId, itemSerial, days, hours, minutes, price, function() {
   console.log('vend created!');
}, function() {
   console.log('unable to create vend!');
});
```
**Cancel a vend:**
```JS
api.cancelVend(vendId, function() {
   console.log('vend canceled!');
}, function() {
   console.log('unable to cancel vend!');
});
```
**Cancel all vends:**
```JS
api.cancelAllVends(function() {
   console.log('all vends have been canceled!');
}, function() {
   console.log('unable to cancel all vends!');
});
```
**Buy a vend with gold/plat:**
```JS
api.buyVendWithGold(storeId, vendId, function() {
   console.log('vend bought with gold!');
}, function() {
   console.log('unable to buy vend with gold!');
});
```
**Buy a vend with gCash:**
```JS
api.buyVendWithGcash(storeId, vendId, function() {
   console.log('vend bought with Gcash!');
}, function() {
   console.log('unable to buy vend with Gcash!');
});
```
**Bid on a vend with gold/plat:**
```JS
api.bidOnVend(storeId, vendId, bidAmount, function() {
   console.log('bid placed on vend!');
}, function() {
   console.log('unable to place bid on vend!');
});
```
**Create a trade:**
```JS
api.createTrade(username, function() {
   console.log('trade created!');
}, function() {
   console.log('unable to create trade!');
});
```
**Edit your store:**
```JS
api.editStore(bbCode, function() {
   console.log('store edited!');
}, function() {
   console.log('unable to edit store!');
});
```
**Buy trading pass:**
```JS
api.buyTradingPass(function() {
   console.log('trading pass bought!');
}, function() {
   console.log('unable to buy trading pass!');
});
```
**Gift an item from a store using gold/plat:**
```JS
api.giftStoreItem(storeId, itemId, itemName, itemPrice, itemQuantity, recipientId, function() {
   console.log('store item gifted!');
}, function() {
   console.log('unable to gift store item!');
});
```
**Use special item from inventory:**
```JS
api.useSpecialItem(itemSerial, itemOption, function() {
   console.log('special item used!');
}, function() {
   console.log('unable to use special item!');
});
```
**Claim daily candy:**
```JS
api.dailyCandy(candyId, function() {
   console.log('daily candy claimed!');
}, function() {
   console.log('unable to claim daily candy!');
});
```
**Claim daily treat:**
```JS
api.dailyTreat(treatType, function() {
   console.log('daily treat claimed!');
}, function() {
   console.log('unable to claim daily treat!');
});
```
**Get an item from dumpster diving:**
```JS
api.dumpsterDive(function() {
   console.log('item received from dumpster!');
}, function() {
   console.log('unable to receive item from dumpster!');
});
```
**Donate Item:**
```JS
api.donateItem(itemSerial, quantity, function() {
   console.log('item donated!');
}, function() {
   console.log('unable to donate item!');
});
```
**Check how many of an item you own:**
```JS
api.itemQuantity(itemId, function(quantity) {
   console.log('you own ' + quantity + ' of this item!');
}, function() {
   console.log('you own 0 of this item!');
});
```
**The user id of the account you're using:**
```JS
api.userId(function(userId) {
   console.log('current user id is ' + userId + '!');
}, function() {
   console.log('unable to get current user id!');
});
```
**The session id of the account you're using:**
```JS
api.sessionId(function(sessionId) {
   console.log('current session id is ' + sessionId + '!');
}, function() {
   console.log('unable to get current session id!');
});
```
**Gold amount:**
```JS
api.goldAmount(function(gold) {
   console.log('you have ' + gold + ' gold!');
}, function() {
   console.log('unable to get gold amount!');
});
```
**Gcash amount:**
```JS
api.gCashAmount(function(cash) {
   console.log('you have ' + cash + ' Gcash!');
}, function() {
   console.log('unable to get Gcash amount!');
});
```
**Inventory:**
```JS
api.inventory(page, perPage, function(inventory) {
   console.log(inventory);
}, function() {
   console.log('unable to get inventory!');
});
```

## Known Function Arguments
**known daily candy ids:** <p>1, 2, 3, 4, 5, 8, 12, 1271, 1279</p>
**known daily treat types:** <p>home, mygaia, market, forum, games, world</p>

## Author
github: https://github.com/jakemadness  
gaiaonline: https://www.gaiaonline.com/gsearch/users/jakemadness  
youtube: https://www.youtube.com/channel/UCQ-V2VrQawc8Xi6b_mH8Law  
