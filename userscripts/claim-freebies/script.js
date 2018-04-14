window.claimFreebies = function(utilities, api) {

   var self       = this;
   self.candies   = [1, 2, 3, 4, 5, 8, 12, 1271, 1279];
   self.treats    = ['home', 'mygaia', 'market', 'forum', 'games'];
   self.maxIndex1 = self.candies.length - 1;
   self.maxIndex2 = self.treats.length  - 1;
   self.index1    = 0;
   self.index2    = 0;

   self.dailyCandy = function() {
      api.dailyCandy(self.candies[self.index1], function() {
         console.log('daily candy ' + self.candies[self.index1] + ' claimed!');
         ++self.index1;
         if ( self.index1 < self.maxIndex1 ) {
            self.dailyCandy();
         }
      }, function() {
         console.log('unable to claim daily candy ' + self.candies[self.index1] + '!');
         ++self.index1;
         if ( self.index1 < self.maxIndex1 ) {
            self.dailyCandy();
         }
      });
   };

   self.dailyTreat = function() {
      api.dailyTreat(self.treats[self.index2], function() {
         console.log(self.treats[self.index2] + ' daily treat claimed!');
         self.dailyTreat();
      }, function() {
         ++self.index2;
         if ( self.index2 <= self.maxIndex2 ) {
            self.dailyTreat();
         }
      });
   };

   self.dailyCandy();
   self.dailyTreat();

};
