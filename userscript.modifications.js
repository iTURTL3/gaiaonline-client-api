window.gaiaonlineModifications = function(api) {

   var patternCallback = function(data, pattern, callback) {
      var patterns = {
         'marketplace': /\/marketplace\//i,
         'item':        /\/itemdetail\/([0-9]+)/i,
         'justAdded':   /\/vendsearch\/\?sortBy=91$/i
      };
      ((match = data.match(patterns[pattern])) && callback(match));
   };

   var quickBuyWithGold = function(link, match) {
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

   var quickBuyWithGcash = function(link, match) {
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

   var quickCancel = function(link, match) {
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

   var quickCancelAll = function(link, match) {
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

   var quickVendLinks = function() {
      patternCallback(window.location.href, 'marketplace', function(match) {
         for ( var links = document.getElementsByTagName('a'), i = 0; i < links.length; i++ ) {
            ((match = links[i].href.match(/\/([0-9]+)\/buy\/\?id=([0-9]+)/i))   && quickBuyWithGold(links[i],  match));
            ((match = links[i].href.match(/\/([0-9]+)\/gcash\/\?id=([0-9]+)/i)) && quickBuyWithGcash(links[i], match));
            ((match = links[i].href.match(/\/mystore\/cancel\/\?id=([0-9]+)/i)) && quickCancel(links[i],       match));
            ((match = links[i].href.match(/\/mystore\/cancelall/i))             && quickCancelAll(links[i],    match));
         }
      });
   };

   var itemQuantity = function() {
      patternCallback(window.location.href, 'item', function(match) {
         api.itemQuantity(match['1'], function(quantity) {
            document.getElementById('vend_item_title').innerHTML += ' (' + quantity + ' owned)';
         }, function(quantity) {
            document.getElementById('vend_item_title').innerHTML += ' (0 owned)';
         });
      });
   };

   var justAddedReload = function() {
      patternCallback(window.location.href, 'justAdded', function(match) {
         window.setTimeout(function() {
            window.location.reload();
         }, 5000);
      });
   };

   var passwordAutoFill = function() {
      for ( var inputs = document.getElementsByTagName('input'), i = 0; i < inputs.length; i++ ) {
         if ( inputs[i].type == 'password' && inputs[i].value !== api.password ) {
            inputs[i].setAttribute('value', api.password);
         }
      }
      window.setTimeout(passwordAutoFill, 100);
   };

   quickVendLinks();
   itemQuantity();
   justAddedReload();
   passwordAutoFill();

};
