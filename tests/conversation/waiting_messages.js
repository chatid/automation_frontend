//This test will not work until the chatbar iframe is given a tag. See BAR-538

var https = require('https');
var SauceLabs = require("sauceLabs");
var path = require('path');

module.exports = {
    '@tags': ['sanity'],

  'Scroll up to see waiting messages': function( client ) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '../..', 'pages'));
    client
    	.page.testpage.load()
      .page.testpage.openWelcomebar()
      .page.testpage.startNewChat()
      for (i = 0; i < 10; i++) {
        client.page.testpage.sendMessage()
      }
      client
        .page.testpage.scrolltoMessagesWaiting()
        .page.testpage.endChat();
  },

    afterEach: function(client, done) {
    	client.customSauceEnd();

      setTimeout(function() {
          done();
      }, 1000);
  }

}