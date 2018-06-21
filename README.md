# Discord Client API
Discord Client API works by including the script on the <b>http://discordapp.com</b> website (preferably in a userscript) then calling its functions.

## Getting Started
Include both discord.utilities.js and discord.api.js files on the discord website. Once you've included those files on the website you can create an instance of the API like the following example:

```JS
var token     = '???';
var utilities = new dUtilities();
var api       = new dApi(utilities, token);
```

**reaction:**
```JS
api.reaction(channelId, messageId, '🐢', function() {
   console.log('reaction complete!');
});
```
