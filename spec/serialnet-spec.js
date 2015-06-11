/* global browser */
var winston = require('winston');
winston.add(winston.transports.File,{name: 'serialnet-info-file',filename: './seriale-info.log',level:'info'});
//testujemy strone seriale.net
describe('Serialnet.pl',function(){
	//Test 1
	//Sprawdx czy link do pomocy jest osiagalny
	it('Check if link to help on menu is accessible.',function(done){
		//zaladuj strone seriale.net w przeglądarce
		browser.url('http://serialnet.pl')
		//poczekaj aż pojawi się menu
		.waitFor('#menu', 7000, function(err){
			if(err)
			{
				//zapisz jesli sie nie powiodlo
				winston.log('error','Can\'t find anything.');
			}
			else
			{
				//kliknij w link pomocy 
				browser.click('#menu [href="http://serialnet.pl/pomoc/"]' , function(err)
				{
					if(err)
					{
						//nie ma w co kliknąć
						winston.log('error','Can not find element.');
					}
					else
					{
						//kliknąłeś w link
						winston.log('info','Find element.');
						//zapisz w logu że wszystko przebiegło pomyslnie
						expect(err).toBe(null);
					}
				});
			}
		}).call(done);
	});
});