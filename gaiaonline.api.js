/*
   @https://github.com/jakemadness/gaiaonline-api
*/
window.gApi = function(utilities, password) {
   var self     = this;
   self.pattern = function(data, pattern) {
      var patterns = {
         'nonce':            /(([0-9]+)\.([0-9]+)\.([0-9]+))/,
         'createVend':       /your\sitem\shas\sbeen\slisted/i,
         'cancelVend':       /this\slisting\shas\sbeen\scancelled/i,
         'cancelAllVends':   /all\slistings\shas\sbeen\scancelled/i,
         'buyVend':          /you\shave\spurchased/i,
         'bidOnVend':        /bid\sconfirmed/i,
         'createTrade':      /trade\srequest\sto\s/i,
         'editStore':        /successfully\ssaved\syour\schanges/i,
         'giftStoreItem':    /\"status\":\"success\"/i,
         'useSpecialItem':   /you\sreceived|you\sgot/i,
         'craftFormula':     /congratulations\!/i,
         'dailyCandy':       /your\sreward\sis/i,
         'dailyTreat':       /\"amount\":([0-9]+)/i,
         'dumpsterDive':     /you\sfound/i,
         'awardAchievement': /true$/i,
         'addToWishlist':    /\"status\":\"success\"/i
      };
      return data.match(patterns[pattern]);
   };
   self.createChap = function(nonce) {
      return utilities.md5(utilities.md5(password) + nonce);
   };
   self.useNonce = function(callback) {
      utilities.getRequest('/api/v1/cashshop/generatenonce?' + utilities.queryString({
         'ts': Date.now()
      }), function(data) {
         ((nonce = self.pattern(data, 'nonce')) && callback(nonce['0']));
      });
   };
   self.gsi = function(methods, callback) {
      utilities.postRequest('/chat/gsi/gateway.php', utilities.queryString({
         'v': 'json',
         'm': '[' + methods.join(',') + ']'
      }), function(data) {
         callback(JSON.parse(data));
      });
   };
   self.createVend = function(itemId, itemSerial, days, hours, minutes, price, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/mystore/sell/', utilities.queryString({
            'step':          'submit',
            'gcash_enable':  '1',
            'vend_type':     '3',
            'item_id':       itemId,
            'item_param':    itemSerial,
            'days':          days,
            'hours':         hours,
            'minutes':       minutes,
            'buy_now_price': price,
            'nonce':         nonce,
            'chap':          self.createChap(nonce)
         }), function(data) {
            (self.pattern(data, 'createVend') ? (success && success()) : (error && error()));
         });
      });
   };
   self.cancelVend = function(vendId, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/mystore/cancel/', utilities.queryString({
            'step':  'submit',
            'id':    vendId,
            'nonce': nonce,
            'chap':  self.createChap(nonce)
         }), function(data) {
            (self.pattern(data, 'cancelVend') ? (success && success()) : (error && error()));
         });
      });
   };
   self.cancelAllVends = function(success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/mystore/cancelall/', utilities.queryString({
            'nonce': nonce,
            'chap':  self.createChap(nonce)
         }), function(data) {
            (self.pattern(data, 'cancelAllVends') ? (success && success()) : (error && error()));
         });
      });
   };
   self.buyVendWithGold = function(storeId, vendId, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/userstore/' + storeId + '/buy/', utilities.queryString({
            'step':     'submit',
            'id':       vendId,
            'password': password,
            'nonce':    nonce
         }), function(data) {
            (self.pattern(data, 'buyVend') ? (success && success()) : (error && error()));
         });
      });
   };
   self.buyVendWithGcash = function(storeId, vendId, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/userstore/' + storeId + '/gcash/', utilities.queryString({
            'step':     'submit',
            'id':       vendId,
            'password': password,
            'nonce':    nonce
         }), function(data) {
            (self.pattern(data, 'buyVend') ? (success && success()) : (error && error()));
         });
      });
   };
   self.bidOnVend = function(storeId, vendId, bidAmount, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/userstore/' + storeId + '/bid/', utilities.queryString({
            'step':     'submit',
            'id':       vendId,
            'amount':   bidAmount,
            'password': password,
            'nonce':    nonce
         }), function(data) {
            (self.pattern(data, 'bidOnVend') ? (success && success()) : (error && error()));
         });
      });
   };
   self.createTrade = function(username, success, error) {
      utilities.postRequest('/gaia/bank.php', utilities.queryString({
         'mode':     'create',
         'username': username
      }), function(data) {
         (self.pattern(data, 'createTrade') ? (success && success()) : (error && error()));
      });
   };
   self.editStore = function(bbCode, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/marketplace/editstore/' + nonce + '/', utilities.queryString({
            'storefront': bbCode
         }), function(data) {
            (self.pattern(data, 'editStore') ? (success && success()) : (error && error()));
         });
      });
   };
   self.giftStoreItem = function(storeId, itemId, itemName, itemPrice, itemQuantity, recipientId, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/api/v1/cashshop/confirmgift', utilities.queryString({
            'privacy':      'anon',
            'message':      'None',
            'pay_with':     'gold',
            'is_gold':      '1',
            'store_id':     storeId,
            'item_id':      itemId,
            'item_name':    itemName,
            'gold_total':   itemPrice * itemQuantity,
            'item_qty':     itemQuantity,
            'recipient_id': recipientId,
            'nonce':        nonce
         }), function(data) {
            (self.pattern(data, 'giftStoreItem') ? (success && success()) : (error && error()));
         });
      });
   };
   self.useSpecialItem = function(itemSerial, itemOption, success, error) {
      self.useNonce(function(nonce) {
         utilities.postRequest('/inventory/use/' + itemSerial + '/' + itemOption, utilities.queryString({
            'nonce': nonce
         }), function(data) {
            (self.pattern(data, 'useSpecialItem') ? (success && success()) : (error && error()));
         });
      });
   };
   self.craftFormula = function(formulaId, formulaPath, success, error) {
      utilities.postRequest('/alchemy/', utilities.queryString({
         'mode':       'submit',
         'formula_id': formulaId,
         'path':       formulaPath
      }), function(data) {
         (self.pattern(data, 'craftFormula') ? (success && success()) : (error && error()));
      });
   };
   self.dailyCandy = function(candyId, success, error) {
      utilities.postRequest('/dailycandy/pretty/', utilities.queryString({
         'action': 'issue',
         'list_id': candyId
      }), function(data) {
         (self.pattern(data, 'dailyCandy') ? (success && success()) : (error && error()));
      });
   };
   self.dailyTreat = function(treatType, success, error) {
      utilities.postRequest('/dailytreat/payout/' + treatType + '/gaia/', utilities.queryString({
         '_view': 'json'
      }), function(data) {
         (self.pattern(data, 'dailyTreat') ? (success && success()) : (error && error()));
      });
   };
   self.dumpsterDive = function(success, error) {
      utilities.postRequest('/dumpsterdive', utilities.queryString({
         'mode': 'showConfirmed'
      }), function(data) {
         (self.pattern(data, 'dumpsterDive') ? (success && success()) : (error && error()));
      });
   };
   self.awardAchievement = function(userId, achievementId, success, error) {
      // example results: https://www.gaiaonline.com/achievements/public/37043881
   };
   self.addItemToWishlist = function(itemId, success, error) {
      self.useNonce(function(nonce) {
         utilities.getRequest('/account/asyncaddwishlist/' + nonce + '/' + itemId, function(data) {
            (self.pattern(data, 'addToWishlist') ? (success && success()) : (error && error()));
         });
      });
   };
   self.itemQuantity = function(itemId, success, error) {
      self.gsi(['[111,[' + itemId + ']]'], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.itemInformation = function(itemId, success, error) {
      self.gsi(['[720,[' + itemId + ']]'], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.userId = function(success, error) {
      self.gsi(['[100,[]]'], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.goldAmount = function(success, error) {
      self.gsi(['[113,[true]]'], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.gCashAmount = function(success, error) {
      self.gsi(['[116,[]]'], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
};
