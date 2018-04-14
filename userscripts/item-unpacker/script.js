window.itemUnpacker = function(utilities, api, password, serials, option) {

   var self      = this;
   self.serials  = [];
   self.option   = '';
   self.index    = 0;
   self.maxIndex = 0;
   self.delay    = 4000;
   self.interval = false;

   self.start = function(serials, option) {
      self.serials  = serials;
      self.option   = option;
      self.maxIndex = serials.length;
      self.interval = setInterval(self.tick, self.delay);
   };

   self.stop = function() {
      clearInterval(self.interval);
   };

   self.tick = function() {
      api.useSpecialItem(self.serials[self.index], self.option, function() {
         ++self.index;
         console.log('item used: ' + self.index + '/' + self.maxIndex);
         if ( self.index >= self.maxIndex ) {
            self.stop();
            console.log('finished unpacking items!');
         }
      }, function() {
         ++self.index;
      });
   };

   self.start(serials, option);

};
