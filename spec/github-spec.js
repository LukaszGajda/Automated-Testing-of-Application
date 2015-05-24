'use strict';
var webdriverio = require('webdriverio');
var options = { 
 desiredCapabilities: { 
 browserName: 'chrome'
}
};
var assert = require('assert');
var winston = require('winston');
winston.add(winston.transports.File,{name: 'github-info-file',filename: './github-info.log',level:'info'});
describe('grunt-webdriver test', function () {
    it('checks if title contains the search query', function(done) {
        var driver = webdriverio.remote(options);
        driver.init();
            driver.url('http://github.com').pause(7000)
            .setValue('[name="q"]','grunt-webdriver')
            .submitForm('.js-site-search-form')
            .getTitle(function(err,title) {
                if(err)
                {
                    winston.log('error','Cant get title.');
                }
                assert(title.indexOf('grunt-webdriver') !== -1);
                winston.log('info',title);
            })
            .end();
    },25000);
});
