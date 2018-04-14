window.sniper = function(utilities, api, password) {

   /*
      VARIABLES.
   */
   var self              = {};
   self.averageBuyPrices = {};
   self.interval         = false;
   self.updateRate       = 4000;


   /*
      MAIN FUNCTIONS.
   */
   self.parseVendData = function(htmlData) {
      var html = utilities.createElement('html', [], htmlData);
      var rows = utilities.findElementsBy(html, 'tr', 'class', 'vend_rows_ex_row(A|B)');
      for ( var parsed = [], i = 0; i < rows.length; i++ ) {
         parsed[i]                       = {};
         parsed[i].itemLink              = utilities.elementChildValue(rows[i].children['0'], 'a',    0, 'href');
         parsed[i].gcashLink             = utilities.elementChildValue(rows[i].children['1'], 'a',    0, 'href');
         parsed[i].buyLink               = utilities.elementChildValue(rows[i].children['2'], 'a',    0, 'href');
         parsed[i].sellerLink            = utilities.elementChildValue(rows[i].children['4'], 'a',    0, 'href');
         parsed[i].bidLink               = utilities.elementChildValue(rows[i].children['3'], 'a',    0, 'href');
         parsed[i].itemImage             = utilities.elementChildValue(rows[i].children['0'], 'img',  0, 'src');
         parsed[i].itemName              = utilities.elementChildValue(rows[i].children['0'], 'span', 0);
         parsed[i].sellerName            = utilities.elementChildValue(rows[i].children['4'], 'a',    0);
         parsed[i].gcashPrice            = utilities.parseNumber(rows[i].children['1'].innerText);
         parsed[i].buyPrice              = utilities.parseNumber(rows[i].children['2'].innerText);
         parsed[i].bidPrice              = utilities.parseNumber(rows[i].children['3'].innerText);
         parsed[i].shortGcashPrice       = utilities.shortenNumber(parsed[i].gcashPrice, 2);
         parsed[i].shortBuyPrice         = utilities.shortenNumber(parsed[i].buyPrice,   2);
         parsed[i].shortBidPrice         = utilities.shortenNumber(parsed[i].bidPrice,   2);
         parsed[i].formattedGcashPrice   = utilities.numberFormat(parsed[i].gcashPrice);
         parsed[i].formattedBuyPrice     = utilities.numberFormat(parsed[i].buyPrice);
         parsed[i].formattedBidPrice     = utilities.numberFormat(parsed[i].bidPrice);
         parsed[i].itemId                = utilities.parseNumber((id = parsed[i].itemLink.match(/itemdetail\/([0-9]+)/i))  && id['1']);
         parsed[i].sellerId              = utilities.parseNumber((id = parsed[i].sellerLink.match(/userstore\/([0-9]+)/i)) && id['1']);
         parsed[i].vendId                = utilities.parseNumber((id = (parsed[i].gcashLink || parsed[i].buyLink || parsed[i].bidLink || '').match(/id=([0-9]+)$/)) && id['1']);
         parsed[i].averagePrice          = 0;
         parsed[i].shortAveragePrice     = 0;
         parsed[i].formattedAveragePrice = 0;
         parsed[i].buyPricePercentage    = 0;
         parsed[i].percentage            = 0;
         parsed[i].type                  = 'unknown';
      }
      html = null;
      return parsed;
   };

   self.updateVendHTML = function(vends) {
      for ( var rows = [], i = 0; i < vends.length; i++ ) {
         rows[i] = utilities.createElement('tr', ['data-type', vends[i].type, 'data-vend', JSON.stringify(vends[i])]);
         utilities.appendChildren(rows[i], [
            utilities.createElement('td', ['style', 'background-image: url(' + vends[i].itemImage + ')']),
            utilities.createElement('td', ['data-value', vends[i].itemName,                   'title', vends[i].itemName]),
            utilities.createElement('td', ['data-value', vends[i].percentage        || 'N/A', 'title', vends[i].percentage + '% ' + (vends[i].type == 'low' && 'lower than' || vends[i].type == 'high' && 'higher than' || 'of') + ' the average buy price']),
            utilities.createElement('td', ['data-value', vends[i].shortAveragePrice || 'N/A', 'title', vends[i].formattedAveragePrice || 'N/A']),
            utilities.createElement('td', ['data-value', vends[i].shortBuyPrice     || 'N/A', 'title', vends[i].formattedBuyPrice     || 'N/A']),
            utilities.createElement('td', ['data-value', vends[i].shortGcashPrice   || 'N/A', 'title', vends[i].formattedGcashPrice   || 'N/A']),
            utilities.createElement('td', ['data-value', vends[i].shortBidPrice     || 'N/A', 'title', vends[i].formattedBidPrice     || 'N/A']),
            utilities.createElement('td', ['data-value', vends[i].sellerName,                 'title', vends[i].sellerName])
         ]);
         rows[i].children['1'].onclick     = self.item;
         rows[i].children['4'].onclick     = self.gold;
         rows[i].children['5'].onclick     = self.gcash;
         rows[i].children['6'].onclick     = self.bid;
         rows[i].children['7'].onclick     = self.seller;
         rows[i].children['4'].onmouseover = self.stop;
         rows[i].children['5'].onmouseover = self.stop;
         rows[i].children['4'].onmouseout  = self.start;
         rows[i].children['5'].onmouseout  = self.start;
      }
      utilities.removeChildren(document.getElementsByTagName('tbody')['0']);
      utilities.appendChildren(document.getElementsByTagName('tbody')['0'], rows);
   };

   self.averageBuyPriceMethods = function(vends) {
      for ( var ids = [], methods = [], i = 0; i < vends.length; i++ ) {
         if ( !(vends[i].itemId in self.averageBuyPrices) && ids.indexOf(vends[i].itemId) < 0 ) {
            ids.push(vends[i].itemId);
            methods.push([720, [vends[i].itemId]]);
         }
      }
      return methods;
   };

   self.cacheAverageBuyPrices = function(data) {
      if ( data['0']['1'] ) {
         for ( var id in data['0']['2'] ) {
            self.averageBuyPrices[id] = data['0']['2'][id].marketPrice;
         }
      }
   };

   self.attachAverageBuyPrices = function(vends, callback) {
      api.gsi(self.averageBuyPriceMethods(vends), function(data) {
         self.cacheAverageBuyPrices(data);
         for ( var i = 0; i < vends.length; i++ ) {
            if ( vends[i].itemId in self.averageBuyPrices ) {
               vends[i].averagePrice          = self.averageBuyPrices[vends[i].itemId];
               vends[i].shortAveragePrice     = utilities.shortenNumber(vends[i].averagePrice, 2);
               vends[i].formattedAveragePrice = utilities.numberFormat(vends[i].averagePrice);
               vends[i].buyPricePercentage    = vends[i].buyPrice / vends[i].averagePrice * 100;
               vends[i].type                  = (vends[i].buyPricePercentage == 100 && 'exact' || vends[i].buyPricePercentage < 100 && 'low' || vends[i].buyPricePercentage > 100 && 'high' || 'unknown');
               vends[i].percentage            = utilities.toFixed(vends[i].type == 'exact' && 100 || vends[i].type == 'low' && 100 - vends[i].buyPricePercentage || vends[i].type == 'high' && vends[i].buyPricePercentage - 100 || 0, 2);
            }
         }
         callback(vends);
      });
   };

   self.getVends = function() {
      utilities.getRequest('/marketplace/vendsearch/?sortBy=91', function(data) {
         self.attachAverageBuyPrices(self.parseVendData(data), self.updateVendHTML);
      });
   };


   /*
      EVENT FUNCTIONS.
   */
   self.item = function() {
      var element = this;
      var data    = JSON.parse(element.parentElement.getAttribute('data-vend'));
      if ( 'itemLink' in data && data.itemLink ) {
         window.open(data.itemLink, '_blank');
      }
   };

   self.gold = function() {
      var element = this;
      var data    = JSON.parse(element.parentElement.getAttribute('data-vend'));
      if ( 'sellerId' in data && data.sellerId && 'vendId' in data && data.vendId && data.buyLink ) {
         api.buyVendWithGold(data.sellerId, data.vendId, function() {
            element.parentElement.setAttribute('data-status', 'success');
         }, function() {
            element.parentElement.setAttribute('data-status', 'error');
         });
      }
   };

   self.gcash = function() {
      var element = this;
      var data    = JSON.parse(element.parentElement.getAttribute('data-vend'));
      if ( 'sellerId' in data && data.sellerId && 'vendId' in data && data.vendId && data.gcashLink ) {
         api.buyVendWithGcash(data.sellerId, data.vendId, function() {
            element.parentElement.setAttribute('data-status', 'success');
         }, function() {
            element.parentElement.setAttribute('data-status', 'error');
         });
      }
   };

   self.bid = function() {
      var element = this;
      var data    = JSON.parse(element.parentElement.getAttribute('data-vend'));
      if ( 'bidLink' in data && data.bidLink ) {
         window.open(data.bidLink, '_blank');
      }
   };

   self.seller = function() {
      var element = this;
      var data   = JSON.parse(element.parentElement.getAttribute('data-vend'));
      if ( 'sellerLink' in data && data.sellerLink ) {
         window.open(data.sellerLink, '_blank');
      }
   };

   self.start = function() {
      self.interval = window.setInterval(self.getVends, self.updateRate);
   };

   self.stop = function() {
      window.clearInterval(self.interval);
   };

};
