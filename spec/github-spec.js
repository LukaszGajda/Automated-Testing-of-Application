/* global browser */
//opis tych bibliotek w pliku first-spec
var assert = require('assert');
var winston = require('winston');
winston.add(winston.transports.File, { name: 'github-info-file', filename: './github-info.log', level: 'info' });
//Testy na stronie GitHuba
describe('Github test', function () {
    //sprawdz czy tytuł zawiera poszukiwana frazę
    it('Checks if title contains the search query.', function (done) {
        //uruchom przeglądarkę ze strona GitHuba
        browser.url('http://github.com')
            //odczekaj az sie zaladuje
            .pause(7000)
            //ustaw wartość 'grunt-webdriver na elemencie o atrybucie 'name' równym 'q'
            .setValue('[name="q"]', 'grunt-webdriver')
            //zatwiedź formularz
            .submitForm('.js-site-search-form')
            //poczekaj az zalduje sie strona z wynikami
            .pause(6000)
            //pobierz tytuł strony
            .getTitle(function(err,title) {
                //sprawdź czy tytuł zawiera słowo 'grunt-webdriver'
                assert(title.indexOf('grunt-webdriver') !== -1);
            }).call(done);
    });
});