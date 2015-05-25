var winston = require('winston');
winston.add(winston.transports.File,{name: 'github-info-file',filename: './github-info.log',level:'info'});
describe('Github test', function () {
    it('Checks if title contains the search query.', function(done) {
      browser.url('http://github.com').pause(7000)
            .setValue('[name="q"]','grunt-webdriver')
            .submitForm('.js-site-search-form')
            .pause(7000)
            .getTitle(function(err,title) {
                if(err)
                {
                    winston.log('error','Cant get title.');
                }
                var x = title.indexOf('grunt-webdriver');
                expect(x).not.toBe(-1);
                winston.log('info',title);
            })
            .end();
    },40000);
});