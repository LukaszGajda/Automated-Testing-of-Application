/// <reference path="../typings/jasmine/jasmine.d.ts"/>
'use strict';
var webdriverio = require('webdriverio');
var options = { 
 desiredCapabilities: { 
 browserName: 'chrome'
}
};
var assert = require('assert');
var winston = require('winston');
winston.add(winston.transports.File,{name: 'first-info-file',filename: './first-info.log',level:'info'});
describe('ThingWorx Test', function () {
    it('checks if title contains "Audit"', function() {
		var driver = webdriverio.remote(options);
        driver.init();
            driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup')
			.pause(7000)
			.getTitle(function(err,title){
				if(err)
				{
					winston.log('error',err);
				}
				assert(title.indexOf('Audit') !== -1);
				winston.log('info',title);
			})
			.end();
	},25000);
});