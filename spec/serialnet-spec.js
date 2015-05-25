/* global browser */
var winston = require('winston');
winston.add(winston.transports.File,{name: 'serialnet-info-file',filename: './seriale-info.log',level:'info'});
describe('Serialnet.pl',function(){
	it('Check if link to help on menu is accessible.',function(done){
		browser.url('http://serialnet.pl')
		.waitFor('#menu', 7000, function(err){
			if(err)
			{
				winston.log('error','Can\'t find anything.');
			}
			else
			{
				browser.click('#menu [href="http://serialnet.pl/pomoc/"]' , function(err)
				{
					if(err)
					{
						winston.log('error','Can not find element.');
					}
					else
					{
						winston.log('info','Find element.');
						expect(err).toBe(null);
					}
				});
			}
		}).call(done);
	});
});