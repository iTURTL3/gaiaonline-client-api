window.itemUnpacker = function(utilities, api, itemId, option, callback) {

   var self      = this;
   self.serials  = [];
   self.interval = null;
   self.delay    = 4000;

   self.getSerials = function(callback) {
      api.inventory(1, 100000000, function(inventory) {
         for ( var i = 0; i < inventory.items.length; i++ ) {
            if ( inventory.items[i].item_id == itemId ) {
               self.serials.push(inventory.items[i].serial);
            }
         }
         callback();
      });
   };

   self.useItem = function() {
      if ( self.serials.length > 0 ) {
         api.useSpecialItem(self.serials['0'], option, function() {
            self.serials = self.serials.slice(1);
            console.log(self.serials.length + ' items left!');
         });
      }
      else {
         clearInterval(self.interval);
         callback();
      }
   };

   self.getSerials(function() {
      self.interval = window.setInterval(self.useItem, self.delay);
   });

};
