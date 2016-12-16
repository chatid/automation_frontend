var https = require('https');
var SauceLabs = require("sauceLabs");
var general_timeout = 2000;

module.exports = {
    load: function () {
        var url = this.client.globals.urls.testpage;

        return this.client
            .url(url)
            .useCss()
            .waitForElementVisible('body', general_timeout)
            .assert.title('ChatID');
        },

    openWelcomebar: function () {
        return this.client
            .waitForElementVisible( '#cta1', general_timeout)
            .assert.containsText( '#cta1', 'Chat with LG! [demo.lg.echo]')
            .click( 'button[id=cta1]')
            .waitForElementVisible( 'button.button-block.button-primary', general_timeout)
            .assert.title('ChatID');
        },

    minimizeWelcomebar: function () {
        return this.client
            .useCss()
            .click('i[class=icon-minimize]')
            .useXpath()
            .waitForElementVisible('//*[contains(concat( " ", @class, " " ), concat( " ", "minimized", " " ))]', 1000);
        },

    maximizeWelcomebar: function () {
        return this.client
            .useCss()
            .waitForElementVisible( 'div.chat-box.panel.minimized', general_timeout)
            .click('div.dock-item')
            .waitForElementVisible( 'button.button-block.button-primary', general_timeout);
    },

    startNewChat: function () {
        return this.client
            .useCss()
            .click( 'button.button-block.button-primary')
            .waitForElementPresent( 'div.message.status', 10000);
    },

    sendMessage: function () {
        var message = this.client.globals.messages.test_message;

        return this.client
            .useCss()
            .click( 'div.input-box')
            .keys(message)
            .keys('\uE007')
            /*.waitForElementPresent ( 'div.message.outgoing', general_timeout)
            .assert.containsText( 'div.message.outgoing', message)*/
    },

    endChat: function () {
        return this.client
            .useCss()
            .click ( 'i.icon-close')
            .waitForElementPresent ( 'p#undefined-confirm-end.prompt', general_timeout)
            .assert.containsText( 'p#undefined-confirm-end.prompt', 'you sure you want to end')
            .click ( 'button.confirm.button-block.button-danger');
    },

    //This function will not work until the chatbar iframe is given a tag. See BAR-538
    scrolltoMessagesWaiting: function () {

        return this.client
            .useCss()
            .click ( 'div.scroller.event-stream.chat-messages')
            .execute('myIframe.contentWindow.scrollTo( 0, 100)')
            .screenshot();
    },

    navToWelcomePage: function () {
        return this.client
            .useXpath()
            .click("//a[text()='Welcome']")
            .assert.title('Welcome');
    },

    skipSurvey: function () {
        return this.client
            .useXpath()
            .click("//a[text()='Skip']")
            .useCss()
            .assert.containsText('span.pull-left', 'no longer active');
    },

    selectSurveyStars: function () {
        return this.client
            .useCss()
            .click( 'li:nth-child(2)');
    }
};