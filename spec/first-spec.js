/// <reference path="../typings/jasmine/jasmine.d.ts"/>
var webdriverio = require('webdriverio');
var options = { 
 desiredCapabilities: { 
 browserName: 'chrome'
}
};
var winston = require('winston');
winston.add(winston.transports.File,{name: 'first-info-file',filename: './first-info.log',level:'info'});
describe('ThingWorx Test', function () {
    it('Checks if title is valid.', function() {
		var driver = webdriverio.remote(options);
        driver.init();
            driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup')
			.pause(7000)
			.getTitle(function(err,title){
				if(err)
				{
					winston.log('error',err);
				}
				var a = title.indexOf('Audit');
				expect(a).not.toBe(-1);
				winston.log('info',title);
			})
			.end();
	},40000);
});