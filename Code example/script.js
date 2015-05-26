var webdriverio = require('webdriverio');
var $ = require('jquery');
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'C:\\Users\\Łukasz Gajda\\Documents\\GitHub\\somefile.log' , json : false});

var options = { 
 desiredCapabilities: { 
 browserName: 'chrome'
}
};
var driver = webdriverio.remote(options);
driver.init();
driver.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup');
driver.url('http://MyUser:stpJa555@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup');
driver.waitFor('#root_ContainedMashup-9_Textbox-9 input', 7000 , function(err)
{
   if(err)
   {
		winston.log('error' ,'Sorry I can\'t find it.');
   }
   else
   {
		driver.setValue('#root_ContainedMashup-9_Textbox-9 input','test123');
   }
});
driver.waitFor('#root_ContainedMashup-9_Button-8 button',7000,function(err)
{
   if(err)
   {
		winston.log('error' ,'Sorry I can\'t find it.');
   }
   else
   {
		driver.click('#root_ContainedMashup-9_Button-8 button');
   }
});
driver.pause(7000);
driver.getAttribute('.tw-status-msg-box','style',function(err,attr){
	if(err)
	{
		winston.log('error' ,'Object not found.');
	}
	else
	{
		winston.log('info','My attribute : ' + attr);
		var str_attr = attr.toString();
		if(str_attr.indexOf("display: none") == -1)
		{
			driver.waitFor('.close-sticky-btn', 4000 , function(err)
			{
				if(err)
				{
					winston.log('error' , 'Failed to close popup');
				}
				driver.click('.close-sticky-btn');
				winston.log('info' , 'popup closed');
			});
		}
	}
});
driver.end();