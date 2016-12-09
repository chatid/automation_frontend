## JS-Nightwatch.js
[![Travis Status](https://travis-ci.org/saucelabs-sample-test-frameworks/JS-Nightwatch.js.svg?branch=master)](https://travis-ci.org/saucelabs-sample-test-frameworks/JS-Nightwatch.js)

This code is provided on an "AS-IS” basis without warranty of any kind, either express or implied, including without limitation any implied warranties of condition, uninterrupted use, merchantability, fitness for a particular purpose, or non-infringement. Your tests and testing environments may require you to modify this framework. Issues regarding this framework should be submitted through GitHub. For questions regarding Sauce Labs integration, please see the Sauce Labs documentation at https://wiki.saucelabs.com/. This framework is not maintained by Sauce Labs Support.

### Environment Setup

1. Global Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```
    $ brew install node
    ```
2. Sauce Credentials
    * In the terminal export your Sauce Labs Credentials as environmental variables:
    ```
    $ export SAUCE_USERNAME=<your Sauce Labs username>
	$ export SAUCE_ACCESS_KEY=<your Sauce Labs access key>
    ```
3. Project Dependencies
	* Install Node modules
	```
	$ npm install
	```

### Running Tests

* Tests in Parallel:
	```
	$ ./node_modules/.bin/nightwatch -e chrome,firefox,internet_explorer_10,android_s4_emulator,iphone_6_simulator tests
	```

[Sauce Labs Dashboard](https://saucelabs.com/beta/dashboard/)

### Advice/Troubleshooting

1. There may be additional latency when using a remote webdriver to run tests on Sauce Labs. Timeouts or Waits may need to be increased.
    * [Selenium tips regarding explicit waits](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Explicit+Waits)

### Resources
##### [Sauce Labs Documentation](https://wiki.saucelabs.com/)

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)

##### [NightwatchJS Documentation](http://nightwatchjs.org/api)

##### [Node Documentation](https://nodejs.org/en/docs/)

##### [Stack Overflow](http://stackoverflow.com/)
* A great resource to search for issues not explicitly covered by documentation

### Reports

1. Reports are automatically run when tests are fired off. By default they are stored in /root/reports.

2. They are in XML format to be readily ingested into whatever reporting platform is used.

3. These reports are optional if going through a third party service such as [Sauce Labs](https://www.saucelabs.com) or [BrowserStack](https://www.browserstack.com).

### Work Completed

1. Starting a new chat

2. Ending a new chat

3. Verifying the CTA renders

4. Minimizing the Welcome Bar

5. Open a minimized Welcome Bar

6. Navigate to the Welcome homepage

7. Opening Welcome Bar

### To Do

Plenty, but going through [TestRail](https://welcomecommerce.testrail.com) will provide insights into what to automate next. Dre has login credentials. Remember that additional credentials cost additional money (we're on a per user license instead of a site license).

### Page Objects

Think of a page object as writing a test in OO form. Consider each "page" to be its own object. While this method is typically used for large websites (login page, product page, user page, etc...), it can be applied here as well.

Pages are stored in /root/pages. Within the page object file you can write out the actions for Selenium/Nightwatch to execute.

### Writing Tests

While this may seem like a trivial task on the surface, it is a fair bit harder than one might expect.

### Test Location

Tests are stored in:
```
/tests/DIR
```

Replace DIR with whatever makes sense for your testing structure. I had some trouble going more than one directory deep past DIR, so be forewarned.

### Parallelism

One of the reasons I chose Nightwatch as our framework was because of its built-in parallel test runner. To enable parallel tests, in the nightwatch.json file, add the following line:
```
"test_workers" : {"enabled" : true, "workers" : "auto"}
```

Enabled turns on parallelism and workers sets the number of child processes. The above line should be the default. Auto will scale up to as many workers as can be created. For running on Sauce Labs or BrowserStack, this is a good standard to follow.

Each test should be broken out into its own file. Doing so allows the worker handler to ingest each file and spin up a new child process for that test.

Your testing should take about as long as your longest test takes to run (assuming no child process limits).

#### Locators
CSS - These are to be considered the gold standard. Use them if at all possible. In Nightwatch you can invoke searching by CSS as follows:
```
client.useCss()
```
After that, it's simply a matter of invoking the appropriate method within Nightwatch (click, assert, etc...).

XPath - If CSS locators are failing, try using XPath instead. It's essentially a direct path to the object you're looking for. To invoke XPath in Nightwatch:
```
client.useXpath()
```
Then paste in the XPath locator.

To find the correct CSS or XPath locator, use Chrome Inspector. If you right click on a piece of code and select copy, you will see options to copy the selector (CSS) or XPath.

#### Mocha
Although we have not setup any Mocha tests yet, I would recommend using [Mocha](https://mochajs.org/) for unit testing of individual Javascript functions across multiple browsers.

Nightwatch is compatible with Mocha's Exports interface, so you can write tests in Mocha and then run them inside Nightwatch.

Mocha example:
```
var arr=[];arr.push('foo');arr.push('bar');expect(arr[0]).to.equal('foo');expect(arr[1]).to.equal('bar');}
```

In this example, the function .push should append values foo and bar and then expects the arr[0] element to be equal to foo and arr[1] to be equal to bar. This testing can be applied to arbitrary Javascript functions.

Another Mocha example:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tests</title>
  <link href="../node_modules/mocha/mocha.css" rel="stylesheet" />
  <script src="../node_modules/mocha/mocha.js"></script>
</head>
<body>

  <!-- A container element for the visual Mocha results -->
  <div id="mocha"></div>

  <!-- Mocha setup and initiation code -->
  <script>
  mocha.setup('bdd');
  window.onload = function() {
    mocha.run();
  };
  </script>

  <!-- The script under test -->
  <script src="index.js"></script>

</body>
</html>
```

Just replace index.js with the script you would like to test.

#### Additional Notes
The above is a good place to start, but a middle layer is required to make the automation more extensible. The locators will not be the same from website to website. While you could certainly write individual tests on a per retailer basis, I suggest the following format instead (pseudocode being used here, proceed with caution).

Map the CSS locators to a generic locator class.

Ex: newegg_CTA -> generic_CTA

Then you can make calls to the generic class and only have to make changes to which retailer/website is being tested.