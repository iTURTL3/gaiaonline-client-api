var vendModifications = function(utilities, api, password) {
   var self              = this;
   self.quickBuyWithGold = function(link, match) {
      link.setAttribute('data-store', match['1']);
      link.setAttribute('data-vend',  match['2']);
      link.href    = 'javascript: void(0)';
      link.onclick = function() {
         var link  = this;
         var store = link.getAttribute('data-store');
         var vend  = link.getAttribute('data-vend');
         api.buyVendWithGold(store, vend, function() {
            link.innerHTML   = 'vend bought!';
            link.style.color = '#00FF00';
            link.onclick     = null;
         }, function() {
            link.innerHTML   = 'unable to buy vend!';
            link.style.color = '#FF0000';
         });
      };
   };
   self.quickBuyWithGcash = function(link, match) {
      link.setAttribute('data-store', match['1']);
      link.setAttribute('data-vend',  match['2']);
      link.href    = 'javascript: void(0)';
      link.onclick = function() {
         var link  = this;
         var store = link.getAttribute('data-store');
         var vend  = link.getAttribute('data-vend');
         api.buyVendWithGcash(store, vend, function() {
            link.innerHTML   = 'vend bought!';
            link.style.color = '#00FF00';
            link.onclick     = null;
         }, function() {
            link.innerHTML   = 'unable to buy vend!';
            link.style.color = '#FF0000';
         });
      };
   };
   self.quickCancel = function(link, match) {
      link.setAttribute('data-vend', match['1']);
      link.href    = 'javascript: void(0)';
      link.onclick = function() {
         var link = this;
         var vend = link.getAttribute('data-vend');
         api.cancelVend(vend, function() {
            link.innerHTML   = 'vend canceled!';
            link.style.color = '#00FF00';
            link.onclick     = null;
         }, function() {
            link.innerHTML   = 'unable to cancel vend!';
            link.style.color = '#FF0000';
         });
      };
   };
   self.quickCancelAll = function(link, match) {
      link.href    = 'javascript: void(0)';
      link.onclick = function() {
         var link = this;
         api.cancelAllVends(function() {
            link.innerHTML   = 'vends canceled!';
            link.style.color = '#00FF00';
            link.onclick     = null;
         }, function() {
            link.innerHTML = 'unable to cancel vends!';
            link.style.color = '#FF0000';
         });
      };
   };
   self.quickVendLinks = function() {
      if ( window.location.href.match(/\/marketplace\//i) ) {
         for ( var links = document.getElementsByTagName('a'), i = 0; i < links.length; i++ ) {
            ((match = links[i].href.match(/\/([0-9]+)\/buy\/\?id=([0-9]+)/i))   && self.quickBuyWithGold(links[i],  match));
            ((match = links[i].href.match(/\/([0-9]+)\/gcash\/\?id=([0-9]+)/i)) && self.quickBuyWithGcash(links[i], match));
            ((match = links[i].href.match(/\/mystore\/cancel\/\?id=([0-9]+)/i)) && self.quickCancel(links[i],       match));
            ((match = links[i].href.match(/\/mystore\/cancelall/i))             && self.quickCancelAll(links[i],    match));
         }
      }
   };
   self.itemQuantity = function() {
      if ( (match = window.location.href.match(/\/itemdetail\/([0-9]+)/i)) ) {
         api.itemQuantity(match['1'], function(quantity) {
            document.getElementById('vend_item_title').innerHTML += ' (' + quantity + ' owned)';
         }, function(quantity) {
            document.getElementById('vend_item_title').innerHTML += ' (0 owned)';
         });
      }
   };
   self.justAddedReload = function() {
      if ( window.location.href.match(/\/vendsearch\/\?sortBy=91$/i) ) {
         window.setTimeout(function() {
            window.location.reload();
         }, 5000);
      }
   };
   self.passwordAutoFill = function() {
      for ( var inputs = document.getElementsByTagName('input'), i = 0; i < inputs.length; i++ ) {
         if ( inputs[i].type == 'password' && inputs[i].value !== password ) {
            inputs[i].setAttribute('value', password);
         }
      }
      window.setTimeout(self.passwordAutoFill, 100);
   };
   self.quickVendLinks();
   self.itemQuantity();
   self.justAddedReload();
   self.passwordAutoFill();
};
