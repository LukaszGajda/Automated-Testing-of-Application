'use strict';
var webdriverio = require('webdriverio');
var options = { 
 desiredCapabilities: { 
 browserName: 'chrome'
}
};
var winston = require('winston');
var assert = require('assert');
describe('Serialnet.pl - Test',function(){
	it('Check if link to help on menu is accessible.',function(){
		var driver = webdriverio.remote(options);
        driver.init();
        driver.url('http://serialnet.pl')
		.waitFor('#menu', 7000, function(err){
			if(err)
			{
				winston.log('Can\'t find anything.');
			}
			else
			{
				browser.click('#menu [href="http://serialnet.pl/pomoc/"]' , function(err)
				{
					if(err)
					{
						winston.log('Can not find element.');
					}
					else
					{
						expect(err).toBe(null);
					}
				});
			}
		});
	},25000);
});
