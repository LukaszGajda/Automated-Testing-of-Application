/* global browser */
var assert = require('assert');
var winston = require('winston');
winston.add(winston.transports.File, { name: 'github-info-file', filename: './github-info.log', level: 'info' });
describe('Github test', function () {
    it('Checks if title contains the search query.', function (done) {
        browser.url('http://github.com')
            .pause(7000)
            .setValue('[name="q"]', 'grunt-webdriver')
            .submitForm('.js-site-search-form')
            .pause(6000)
            .getTitle(function(err,title) {
                assert(title.indexOf('grunt-webdriver') !== -1);
            }).call(done);
    });
});