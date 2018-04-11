// create an instance of the api.
var password  = 'my account passwrd;'
var utilities = new window.gUtilities();
var api       = new window.gApi(utilities, password);


// create a trade with jeff
window.api.createTrade('jeff', function() {
   alert('trade created with jeff!');
}, function() {
   alert('unable to create trade with jeff!');
});
