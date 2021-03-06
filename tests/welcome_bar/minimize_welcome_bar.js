var https = require('https');
var SauceLabs = require("sauceLabs");
var path = require('path');

module.exports = {
    '@tags': ['sanity'],

  'User is able to minimize Welcome Bar': function( client) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '../..', 'pages'));
    client
      .page.testpage.load()
      .page.testpage.openWelcomebar()
      .page.testpage.minimizeWelcomebar();
  },

    afterEach: function(client, done) {
    	client.customSauceEnd();

      setTimeout(function() {
          done();
      }, 1000);
  }

}