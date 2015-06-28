var webdriverio = require('webdriverio');
var options = {
	desiredCapabilities: {
		browserName: 'chrome'
	}
};

var driver = webdriverio.remote(options);
driver.init();
driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/'
	+ 'Thingworx/Runtime/index.html#mashup=AuditMashup');
driver.pause(7000);
//pobierz tytuł
driver.getTitle();
//poczekaj az załaduje sie textbox
driver.waitFor('#root_ContainedMashup-9_Textbox-9 input', 7000,
	function (err) {
		//wpisz do textboxa tekst 'test123'
		driver.setValue('#root_ContainedMashup-9_Textbox-9 input', 'test123');
	});
// odczekaj aż pojawi się przycisk na stronie
driver.waitFor('#root_ContainedMashup-9_Button-8 button', 7000, function (err) {
	//przycisk się załadował kliknij w niego
	driver.click('#root_ContainedMashup-9_Button-8 button',
		function (err) {
			//poczekaj na załadowanie komunikatu że plik o nazwie 
			//'test123' nie istnieje w repozytorium
			driver.pause(7000).getAttribute('.tw-status-msg-box', 'style',
				function (err, attr) {
					var str_attr = attr.toString();
					if (str_attr.indexOf("display: none") == -1) {
						//sprawdź czy się załadował przycisk w oknie komunikatu
						driver.waitFor('.close-sticky-btn', 4000, function (err) {
							//kliknij w przycisk w oknie komunikatu , aby go zamknąć
							driver.click('.close-sticky-btn').pause(2000)
								.getAttribute('.tw-status-msg-box', 'style');
						});
					}
				});
		});
});
driver.end();
