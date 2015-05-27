var webdriverio = require('webdriverio');
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'C:\\Users\\Łukasz Gajda\\Documents\\GitHub\\TestWithTwoUser.log' , json : false});

var options = {
 desiredCapabilities: {
 browserName: 'chrome'
}
};

var driver = webdriverio.remote(options);
driver.init();
driver.url('http://AutomaticTestUser:stpJa555@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup');
driver.pause(7000);
driver.getCurrentTabId(function(err,title){
	winston.log('info','TabId ==> ' + title);
});
driver.end();
