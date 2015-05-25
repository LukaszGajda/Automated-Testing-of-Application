/* global browser */
var winston = require('winston');
winston.add(winston.transports.File, { name: 'github-info-file', filename: './github-info.log', level: 'info' });
describe('Github test', function () {
    it('Checks if title contains the search query.', function (done) {
        browser.url('http://github.com')
            .pause(15000)
            .setValue('[name="q"]', 'grunt-webdriver')
            .submitForm('.js-site-search-form')
            .pause(15000)
            .getTitle(function (err, title) {
            if (err) {
                winston.log('error', err);
            }
            else {
                expect(title).toContain("grunt-webdriver");
                winston.log('info', title);
            }
        }).call(done);
    });
});