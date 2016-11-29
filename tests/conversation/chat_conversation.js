var https = require('https');
var SauceLabs = require("sauceLabs");
var path = require('path');

module.exports = {
    '@tags': ['sanity'],

  'Complete a chat conversation': function( client ) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '../..', 'pages'));
    client
    	.page.testpage.load()
      .page.testpage.openWelcomebar()
      .page.testpage.startNewChat()
      .page.testpage.sendMessage()
      .page.testpage.endChat();
  },

    afterEach: function(client, done) {
    	client.customSauceEnd();

      setTimeout(function() {
          done();
      }, 1000);
  }

}