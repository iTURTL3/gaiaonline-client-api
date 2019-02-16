module.exports = function(cookies, password) {

   /*
      VARIABLES & DEPENDENCIES.
   */
   var self     = this;
   self.md5     = require('md5');
   self.request = require('request');
   self.baseUrl = 'https://www.gaiaonline.com/';

   /*
      REUSABLE FUNCTIONS.
   */
   self.httpRequest = function(method, url, headers, post, callback) {
      self.request({
         'method':  method,
         'url':     url,
         'headers': headers,
         'body':    post,
      }, function(error, response, data) {
         if ( !error ) {
            callback(data);
         }
      });
   };
   self.getRequest = function(url, callback) {
      self.httpRequest('GET', self.baseUrl + url, {
         'Cookie': cookies
      }, null, callback);
   };
   self.postRequest = function(url, post, callback) {
      self.httpRequest('POST', self.baseUrl + url, {
         'X-Requested-With': 'XMLHttpRequest',
         'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
         'Cookie':           cookies
      }, post, callback);
   };
   self.queryString = function(object) {
      var query = '';
      for ( var key in object ) {
         query += key         + '=';
         query += object[key] + '&';
      }
      return query.slice(0, -1);
   };
   self.urlDecode = function(data) {
      data = data.replace(/\+/g, ' ');
      return decodeURIComponent(data);
   };

   /*
      MAIN FUNCTIONS.
   */
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
         'buyTradingPass':   /trading\spass\spurchased/i,
         'giftStoreItem':    /\"status\":\"success\"/i,
         'useSpecialItem':   /you\sreceived|you\sgot|play\sagain/i,
         'dailyCandy':       /your\sreward\sis/i,
         'dailyTreat':       /\"amount\":([0-9]+)/i,
         'dumpsterDive':     /you\sfound/i,
         'donateItem':       /success\!/i
      };
      return data.match(patterns[pattern]);
   };
   self.createChap = function(nonce) {
      return self.md5(self.md5(password) + nonce);
   };
   self.useNonce = function(callback) {
      self.getRequest('api/v1/cashshop/generatenonce?' + self.queryString({
         'ts': Date.now()
      }), function(data) {
         ((nonce = self.pattern(data, 'nonce')) && callback(nonce['0']));
      });
   };
   self.gsi = function(methods, callback) {
      self.postRequest('chat/gsi/gateway.php', self.queryString({
         'v': 'json',
         'X': Date.now(),
         'm': JSON.stringify(methods)
      }), function(data) {
         ((data = self.urlDecode(data)) && (data = JSON.parse(data)) && callback(data));
      });
   };
   self.createVend = function(itemId, itemSerial, days, hours, minutes, price, success, error) {
      self.useNonce(function(nonce) {
         self.postRequest('marketplace/mystore/sell/', self.queryString({
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
         self.postRequest('marketplace/mystore/cancel/', self.queryString({
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
         self.postRequest('marketplace/mystore/cancelall/', self.queryString({
            'nonce': nonce,
            'chap':  self.createChap(nonce)
         }), function(data) {
            (self.pattern(data, 'cancelAllVends') ? (success && success()) : (error && error()));
         });
      });
   };
   self.buyVendWithGold = function(storeId, vendId, success, error) {
      self.useNonce(function(nonce) {
         self.postRequest('marketplace/userstore/' + storeId + '/buy/', self.queryString({
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
         self.postRequest('marketplace/userstore/' + storeId + '/gcash/', self.queryString({
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
         self.postRequest('marketplace/userstore/' + storeId + '/bid/', self.queryString({
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
      self.postRequest('gaia/bank.php', self.queryString({
         'mode':     'create',
         'username': username
      }), function(data) {
         (self.pattern(data, 'createTrade') ? (success && success()) : (error && error()));
      });
   };
   self.editStore = function(bbCode, success, error) {
      self.useNonce(function(nonce) {
         self.postRequest('marketplace/editstore/' + nonce + '/', self.queryString({
            'storefront': bbCode
         }), function(data) {
            (self.pattern(data, 'editStore') ? (success && success()) : (error && error()));
         });
      });
   };
   self.buyTradingPass = function(success, error) {
      self.useNonce(function(nonce) {
         self.postRequest('marketplace/', self.queryString({
            'tradingpass': '1',
            'password':    password,
            'nonce':       nonce
         }), function(data) {
            (self.pattern(data, 'buyTradingPass') ? (success && success()) : (error && error()));
         });
      });
   };
   self.giftStoreItem = function(storeId, itemId, itemName, itemPrice, itemQuantity, recipientId, success, error) {
      self.useNonce(function(nonce) {
         self.postRequest('api/v1/cashshop/confirmgift', self.queryString({
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
         self.postRequest('inventory/use/' + itemSerial + '/' + itemOption, self.queryString({
            'nonce': nonce
         }), function(data) {
            (self.pattern(data, 'useSpecialItem') ? (success && success()) : (error && error()));
         });
      });
   };
   self.dailyCandy = function(candyId, success, error) {
      self.postRequest('dailycandy/pretty/', self.queryString({
         'action': 'issue',
         'list_id': candyId
      }), function(data) {
         (self.pattern(data, 'dailyCandy') ? (success && success()) : (error && error()));
      });
   };
   self.dailyTreat = function(treatType, success, error) {
      self.postRequest('dailytreat/payout/' + treatType + '/gaia/', self.queryString({
         '_view': 'json'
      }), function(data) {
         (self.pattern(data, 'dailyTreat') ? (success && success()) : (error && error()));
      });
   };
   self.dumpsterDive = function(success, error) {
      self.postRequest('dumpsterdive', self.queryString({
         'mode': 'showConfirmed'
      }), function(data) {
         (self.pattern(data, 'dumpsterDive') ? (success && success()) : (error && error()));
      });
   };
   self.donateItem = function(itemSerial, quantity, success, error) {
      self.postRequest('inventory/donate/', self.queryString({
         'nonce':    'null',
         'serial':   itemSerial,
         'quantity': quantity
      }), function(data) {
         (self.pattern(data, 'donateItem') ? (success && success()) : (error && error()));
      });
   };
   self.itemQuantity = function(itemId, success, error) {
      self.gsi([[111, [itemId]]], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.userId = function(success, error) {
      self.gsi([[100, []]], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.sessionId = function(success, error) {
      self.gsi([[109, []]], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.goldAmount = function(success, error) {
      self.gsi([[113, [true]]], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.gCashAmount = function(success, error) {
      self.gsi([[116,[]]], function(data) {
         (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
      });
   };
   self.inventory = function(page, perPage, success, error) {
      self.sessionId(function(sessionId) {
         self.gsi([[721, [sessionId, page, perPage]]], function(data) {
            (data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
         });
      });
   };

};
