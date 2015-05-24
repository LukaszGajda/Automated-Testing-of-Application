'use strict';
var webdriverio = require('webdriverio');
var options = { 
 desiredCapabilities: { 
 browserName: 'chrome'
}
};
var assert = require('assert');
describe('ThingWorx Test', function () {
    it('checks if title contains "Audit"', function() {
		var driver = webdriverio.remote(options);
        driver.init();
            driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup')
			.pause(7000)
			.getTitle(function(err,title){
				assert(title.indexOf('Audit') !== -1);
			})
			.end();
	},25000);
});