/* global browser */
/// <reference path="../typings/jasmine/jasmine.d.ts"/>
//assert to biblioteka używana do pisania testów jednostkowych
var assert = require('assert');
//winston to biblioteka do tworzenia logów
var winston = require('winston');
//fs to biblioteka do obsługi systemu plików
var fs = require('fs');
//tworzę własny logger
var logger = new (winston.Logger)({
	transports:[
		new (winston.transports.File)({name: 'first-info-file', 
			filename: './first-info.log', level: 'info' }),
		new (winston.transports.File)({name: 'first-error-file', 
			filename: './first-error.log', level: 'error' })]
});
//pobieram plik z konfiguracją
var config = JSON.parse(fs.readFileSync('spec/ThingWorxConfig.json','utf-8'));
var logon = config.Credentials.login + ':' + config.Credentials.password + '@';
//opis grupy testów
describe('ThingWorx Test', function () {
	// it opisuje kolejne testy
	//Test 1 
	// Pobieramy stronę i sprawdzamy czy tytuł strony ma poprawna nazwę
    it('Checks if title is valid.', function () {
		//pobieramy stronę
		browser.url('http://' + logon + config.Mashup + config.Mashups[0])
		//czekaj 10s az strona się załaduje
			.pause(10000)
			//pobierz tytuł
			.getTitle(function (err, title) {
				//Czy tytuł zawiera szukane słowo 'Audit'
				assert(title.indexOf('Audit') != -1);
				//zapisz tytuł w logu
				logger.info(title);});
	});
	
	//Test 2
	//Sprawdzamy czy po wpisaniu ciągu znaków do textboxa 
	//i wciśnieciu pprzycisku wyskoczy nam komunikat że nie ma pliku o podanej nazwie
	it('Check if you can fill form and click button', function(done){
		//pobierz stronę
		browser.url('http://' + logon + config.Mashup + config.Mashups[0])
		//poczekaj az załaduje sie textbox
		.waitFor('#root_ContainedMashup-9_Textbox-9 input', 7000, function(err){
			//wpisz do textboxa tekst 'test123'
			browser.setValue('#root_ContainedMashup-9_Textbox-9 input', 'test123');
			logger.info('W polu tekstowym wpisano tekst \'test123\'.');
		})
		// odczekaj aż pojawi się przycisk na stronie
		.waitFor('#root_ContainedMashup-9_Button-8 button', 7000, function(err){
			//przycisk się załadował kliknij w niego
			browser.click('#root_ContainedMashup-9_Button-8 button', function(err){
				//poczekaj na załadowanie komunikatu że plik 
				//o nazwie 'test123' nie istnieje w repozytorium
				browser.pause(7000).getAttribute('.tw-status-msg-box','style',
					function(err,attr){
					var str_attr = attr.toString();
					//sprawdż czy komunikat jest widoczny
					assert(str_attr.indexOf("display: none") == -1);
					if(str_attr.indexOf("display: none") == -1)
					{
						//sprawdź czy się załadował przycisk w oknie komunikatu
						browser.waitFor('.close-sticky-btn', 4000 , function(err){
							//kliknij w przycisk w oknie komunikatu , aby go zamknąć
							browser.click('.close-sticky-btn').pause(2000)
							.getAttribute('.tw-status-msg-box','style',
								function(err,attribute){
								var attr_str = attribute.toString();
								//sprawdź czy komunikat został zamkniety
								assert(attr_str.indexOf("display: none") > 0);
								logger.info('Okno komunikatu zostało zamknięte.');
							});
						});
					}
				});
			});
		}).pause(3000).call(done);
		//call(done) kończy sesje przegladarki
	});
});