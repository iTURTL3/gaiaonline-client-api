var password = 'myAccountPassword';
window.api   = window.gaiaonlineApi(password);

// create trade with jeff
window.api.createTrade('jeff', function() {
   console.log('trade created with jeff!');
}, function() {
   console.log('unable to create trade with jeff!');
});
