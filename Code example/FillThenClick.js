var webdriverio = require('webdriverio');
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'C:\\Users\\Łukasz Gajda\\Documents\\GitHub\\somefile.log', json: false });

var options = {
   desiredCapabilities: {
      browserName: 'chrome'
   }
};
var driver = webdriverio.remote(options);
driver.init();
driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup');
driver.waitFor('#root_ContainedMashup-9_Textbox-9 input', 7000, function (err) {
   if (err) {
      winston.log('error', 'Sorry I can\'t find it.');
   }
   else {
      driver.setValue('#root_ContainedMashup-9_Textbox-9 input', 'test123');
   }
});
driver.waitFor('#root_ContainedMashup-9_Button-8 button', 7000, function (err) {
   if (err) {
      winston.log('error', 'Sorry I can\'t find it.');
   }
   else {
      driver.click('#root_ContainedMashup-9_Button-8 button');
   }
}).pause(7000).end();