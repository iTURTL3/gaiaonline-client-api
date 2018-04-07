window.gaiaonline = function(password) {


   /*
      REUSABLE FUNCTIONS.
   */
   var utilities = function() {
      var self = this;
      self.md5 = function(string) {
         function f1(a, b) {
            var c, d, e, f, g;
            e = (a & 0x80000000), f = (b & 0x80000000), c = (a & 0x40000000), d = (b & 0x40000000), g = (a & 0x3FFFFFFF) + (b & 0x3FFFFFFF);
            return (((c & d) || (c | d)) ? ((c & d) ? (g ^ 0x80000000 ^ e ^ f) : (g & 0x40000000 ? (g ^ 0xC0000000 ^ e ^ f) : (g ^ 0x40000000 ^ e ^ f))) : (g ^ e ^ f));
         }
         function f2(a, b, c, d, e, f, g) {
            a = f1(a, f1(f1((b & c) | ((~b) & d), e), g));
            return f1((a << f) | (a >>> (32 - f)), b);
         }
         function f3(a, b, c, d, e, f, g) {
            a = f1(a, f1(f1((b & d) | (c & (~d)), e), g));
            return f1((a << f) | (a >>> (32 - f)), b);
         }
         function f4(a, b, c, d, e, f, g) {
            a = f1(a, f1(f1((b ^ c ^ d), e), g));
            return f1((a << f) | (a >>> (32 - f)), b);
         }
         function f5(a, b, c, d, e, f, g) {
            a = f1(a, f1(f1((c ^ (b | (~d))), e), g));
            return f1((a << f) | (a >>> (32 - f)), b);
         }
         function f6(a) {
            var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = (e + 1) * 16, g = Array(f - 1), h = i = 0;
            while ( i < c ) {
               b = (i - (i % 4)) / 4, h = (i % 4) * 8, g[b] = (g[b] | (a.charCodeAt(i) << h)), i++;
            }
            b = (i - (i % 4)) / 4, h = (i % 4) * 8, g[b] = g[b] | (0x80 << h), g[f - 2] = c << 3, g[f - 1] = c >>> 29;
            return g;
         }
         function f7(a) {
            var b = '', c = '', d, e;
            for ( e = 0; e <= 3; e++ ) {
               d = (a >>> (e * 8)) & 255, c = '0' + d.toString(16), b = b + c.substr(c.length - 2, 2);
            }
            return b;
         }
         function f8(a) {
            a = a.replace(/\r\n/g, '\n'), b = '';
            for ( var c = 0; c < a.length; c++ ) {
               var d = a.charCodeAt(c);
               if ( d < 128 ) {
                  b += String.fromCharCode(d);
               }
               else if ( (d > 127) && (d < 2048) ) {
                  b += String.fromCharCode((d >> 6) | 192), b += String.fromCharCode((d & 63) | 128);
               }
               else {
                  b += String.fromCharCode((d >> 12) | 224), b += String.fromCharCode(((d >> 6) & 63) | 128), b += String.fromCharCode((d & 63) | 128);
               }
            }
            return b;
         }
         var x = Array();
         var k, AA, BB, CC, DD, a, b, c, d;
         var S11    = 7, S12 = 12, S13 = 17, S14 = 22;
         var S21    = 5, S22 = 9 , S23 = 14, S24 = 20;
         var S31    = 4, S32 = 11, S33 = 16, S34 = 23;
         var S41    = 6, S42 = 10, S43 = 15, S44 = 21;
         string     = f8(string), x = f6(string), a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
         for ( k = 0; k < x.length; k += 16 ) {
            AA = a; BB = b; CC = c; DD = d;
            a = f2(a, b, c, d, x[k + 0],  S11, 0xD76AA478);
            d = f2(d, a, b, c, x[k + 1],  S12, 0xE8C7B756);
            c = f2(c, d, a, b, x[k + 2],  S13, 0x242070DB);
            b = f2(b, c, d, a, x[k + 3],  S14, 0xC1BDCEEE);
            a = f2(a, b, c, d, x[k + 4],  S11, 0xF57C0FAF);
            d = f2(d, a, b, c, x[k + 5],  S12, 0x4787C62A);
            c = f2(c, d, a, b, x[k + 6],  S13, 0xA8304613);
            b = f2(b, c, d, a, x[k + 7],  S14, 0xFD469501);
            a = f2(a, b, c, d, x[k + 8],  S11, 0x698098D8);
            d = f2(d, a, b, c, x[k + 9],  S12, 0x8B44F7AF);
            c = f2(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = f2(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = f2(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = f2(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = f2(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = f2(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = f3(a, b, c, d, x[k + 1],  S21, 0xF61E2562);
            d = f3(d, a, b, c, x[k + 6],  S22, 0xC040B340);
            c = f3(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = f3(b, c, d, a, x[k + 0],  S24, 0xE9B6C7AA);
            a = f3(a, b, c, d, x[k + 5],  S21, 0xD62F105D);
            d = f3(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = f3(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = f3(b, c, d, a, x[k + 4],  S24, 0xE7D3FBC8);
            a = f3(a, b, c, d, x[k + 9],  S21, 0x21E1CDE6);
            d = f3(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = f3(c, d, a, b, x[k + 3],  S23, 0xF4D50D87);
            b = f3(b, c, d, a, x[k + 8],  S24, 0x455A14ED);
            a = f3(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = f3(d, a, b, c, x[k + 2],  S22, 0xFCEFA3F8);
            c = f3(c, d, a, b, x[k + 7],  S23, 0x676F02D9);
            b = f3(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = f4(a, b, c, d, x[k + 5],  S31, 0xFFFA3942);
            d = f4(d, a, b, c, x[k + 8],  S32, 0x8771F681);
            c = f4(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = f4(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = f4(a, b, c, d, x[k + 1],  S31, 0xA4BEEA44);
            d = f4(d, a, b, c, x[k + 4],  S32, 0x4BDECFA9);
            c = f4(c, d, a, b, x[k + 7],  S33, 0xF6BB4B60);
            b = f4(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = f4(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = f4(d, a, b, c, x[k + 0],  S32, 0xEAA127FA);
            c = f4(c, d, a, b, x[k + 3],  S33, 0xD4EF3085);
            b = f4(b, c, d, a, x[k + 6],  S34, 0x4881D05);
            a = f4(a, b, c, d, x[k + 9],  S31, 0xD9D4D039);
            d = f4(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = f4(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = f4(b, c, d, a, x[k + 2],  S34, 0xC4AC5665);
            a = f5(a, b, c, d, x[k + 0],  S41, 0xF4292244);
            d = f5(d, a, b, c, x[k + 7],  S42, 0x432AFF97);
            c = f5(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = f5(b, c, d, a, x[k + 5],  S44, 0xFC93A039);
            a = f5(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = f5(d, a, b, c, x[k + 3],  S42, 0x8F0CCC92);
            c = f5(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = f5(b, c, d, a, x[k + 1],  S44, 0x85845DD1);
            a = f5(a, b, c, d, x[k + 8],  S41, 0x6FA87E4F);
            d = f5(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = f5(c, d, a, b, x[k + 6],  S43, 0xA3014314);
            b = f5(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = f5(a, b, c, d, x[k + 4],  S41, 0xF7537E82);
            d = f5(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = f5(c, d, a, b, x[k + 2],  S43, 0x2AD7D2BB);
            b = f5(b, c, d, a, x[k + 9],  S44, 0xEB86D391);
            a = f1(a, AA), b = f1(b, BB), c = f1(c, CC), d = f1(d, DD);
         }
         return f7(a) + f7(b) + f7(c) + f7(d);
      };
      self.queryString = function(object) {
         var query = '';
         for ( var key in object ) {
            query += key         + '=';
            query += object[key] + '&';
         }
         return query.slice(0, -1);
      };
      self.httpRequest = function(method, url, headers, post, callback) {
         var request = new XMLHttpRequest();
         request.onreadystatechange = function() {
            (this.readyState == 4 && callback(this.responseText));
         };
         request.open(method, url, true);
         for ( var i = 0; i < headers.length; i += 2 ) {
            request.setRequestHeader(headers[i], headers[i + 1]);
         }
         request.send(post);
      };
      self.postRequest = function(url, post, callback) {
         self.httpRequest('POST', url, ['X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'], post, callback);
      };
   };


   /*
      API FUNCTIONS.
   */
   var api = function(utilities, password) {
      var self       = this;
      self.utilities = utilities;
      self.password  = password;
      self.pattern   = function(data, pattern) {
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
            'awardAchievement': /true$/i
         };
         return data.match(patterns[pattern]);
      };
      self.createChap = function(nonce) {
         return self.utilities.md5(self.utilities.md5(self.password) + nonce);
      };
      self.useNonce = function(callback) {
         self.utilities.postRequest('/api/v1/cashshop/generatenonce', self.utilities.queryString({
            'ts': Date.now()
         }), function(data) {
            ((nonce = self.pattern(data, 'nonce')) && callback(nonce['0']));
         });
      };
      self.createVend = function(itemId, itemSerial, days, hours, minutes, price, success, error) {
         self.useNonce(function(nonce) {
            self.utilities.postRequest('/marketplace/mystore/sell/', self.utilities.queryString({
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
            self.utilities.postRequest('/marketplace/mystore/cancel/', self.utilities.queryString({
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
            self.utilities.postRequest('/marketplace/mystore/cancelall/', self.utilities.queryString({
               'nonce': nonce,
               'chap':  self.createChap(nonce)
            }), function(data) {
               (self.pattern(data, 'cancelAllVends') ? (success && success()) : (error && error()));
            });
         });
      };
      self.buyVendWithGold = function(storeId, vendId, success, error) {
         self.useNonce(function(nonce) {
            self.utilities.postRequest('/marketplace/userstore/' + storeId + '/buy/', self.utilities.queryString({
               'step':     'submit',
               'id':       vendId,
               'password': self.password,
               'nonce':    nonce
            }), function(data) {
               (self.pattern(data, 'buyVend') ? (success && success()) : (error && error()));
            });
         });
      };
      self.buyVendWithGcash = function(storeId, vendId, success, error) {
         self.useNonce(function(nonce) {
            self.utilities.postRequest('/marketplace/userstore/' + storeId + '/gcash/', self.utilities.queryString({
               'step':     'submit',
               'id':       vendId,
               'password': self.password,
               'nonce':    nonce
            }), function(data) {
               (self.pattern(data, 'buyVend') ? (success && success()) : (error && error()));
            });
         });
      };
      self.bidOnVend = function(storeId, vendId, bidAmount, success, error) {
         self.useNonce(function(nonce) {
            self.utilities.postRequest('/marketplace/userstore/' + storeId + '/bid/', self.utilities.queryString({
               'step':     'submit',
               'id':       vendId,
               'amount':   bidAmount,
               'password': self.password,
               'nonce':    nonce
            }), function(data) {
               (self.pattern(data, 'bidOnVend') ? (success && success()) : (error && error()));
            });
         });
      };
      self.createTrade = function(username, success, error) {
         self.utilities.postRequest('/gaia/bank.php', self.utilities.queryString({
            'mode':     'create',
            'username': username
         }), function(data) {
            (self.pattern(data, 'createTrade') ? (success && success()) : (error && error()));
         });
      };
      self.editStore = function(bbCode, success, error) {
         self.useNonce(function(nonce) {
            self.utilities.postRequest('/marketplace/editstore/' + nonce + '/', self.utilities.queryString({
               'storefront': bbCode
            }), function(data) {
               (self.pattern(data, 'editStore') ? (success && success()) : (error && error()));
            });
         });
      };
      self.giftStoreItem = function(storeId, itemId, itemName, itemPrice, itemQuantity, recipientId, success, error) {
         self.useNonce(function(nonce) {
            self.utilities.postRequest('/api/v1/cashshop/confirmgift', self.utilities.queryString({
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
            self.utilities.postRequest('/inventory/use/' + itemSerial + '/' + itemOption, self.utilities.queryString({
               'nonce': nonce
            }), function(data) {
               (self.pattern(data, 'useSpecialItem') ? (success && success()) : (error && error()));
            });
         });
      };
      self.craftFormula = function(formulaId, formulaPath, success, error) {
         self.utilities.postRequest('/alchemy/', self.utilities.queryString({
            'mode':       'submit',
            'formula_id': formulaId,
            'path':       formulaPath
         }), function(data) {
            (self.pattern(data, 'craftFormula') ? (success && success()) : (error && error()));
         });
      };
      self.dailyCandy = function(candyId, success, error) {
         self.utilities.postRequest('/dailycandy/pretty/', self.utilities.queryString({
            'action': 'issue',
            'list_id': candyId
         }), function(data) {
            (self.pattern(data, 'dailyCandy') ? (success && success()) : (error && error()));
         });
      };
      self.dailyTreat = function(treatType, success, error) {
         self.utilities.postRequest('/dailytreat/payout/' + treatType + '/gaia/', self.utilities.queryString({
            '_view': 'json'
         }), function(data) {
            (self.pattern(data, 'dailyTreat') ? (success && success()) : (error && error()));
         });
      };
      self.dumpsterDive = function(success, error) {
         self.utilities.postRequest('/dumpsterdive', self.utilities.queryString({
            'mode': 'showConfirmed'
         }), function(data) {
            (self.pattern(data, 'dumpsterDive') ? (success && success()) : (error && error()));
         });
      };
      self.awardAchievement = function(userId, achievementId, success, error) {
         // example: https://www.gaiaonline.com/achievements/public/37043881
      };
      self.itemQuantity = function(itemId, success, error) {
         self.utilities.postRequest('/chat/gsi/index.php', self.utilities.queryString({
            'v': 'json',
            'm': '[[111,[' + itemId + ']]]'
         }), function(data) {
            ((data = JSON.parse(data)) && data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
         });
      };
      self.userId = function(success, error) {
         self.utilities.postRequest('/chat/gsi/index.php', self.utilities.queryString({
            'v': 'json',
            'm': '[[100,[]]]'
         }), function(data) {
            ((data = JSON.parse(data)) && data['0']['1'] ? (success && success(data['0']['2'])) : (error && error()));
         });
      };
   };

   return new api(new utilities(), password);

};
