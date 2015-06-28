var webdriverio = require('webdriverio');
var options = {
	desiredCapabilities: {
		browserName: 'chrome'
	}
};
var driver = webdriverio.remote(options);
driver.init();
driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/'
	+'Thingworx/Runtime/index.html#mashup=AuditMashup');
driver.pause(7000);
driver.end();
