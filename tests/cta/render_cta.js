var https = require('https');
var SauceLabs = require("sauceLabs");
var path = require('path');

module.exports = {
    '@tags': ['sanity'],

  'CTA Renders With Agents Available': function( client ) {
    require('nightwatch-pages')(client, path.resolve(__dirname, '../..', 'pages'));
    client
    	.page.testpage.load();
  },

    afterEach: function(client, done) {
    	client.customSauceEnd();

      setTimeout(function() {
          done();
      }, 1000);
  }

}