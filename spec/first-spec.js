/* global browser */
/// <reference path="../typings/jasmine/jasmine.d.ts"/>
var assert = require('assert');
var winston = require('winston');
winston.add(winston.transports.File, { name: 'first-info-file', filename: './first-info.log', level: 'info' });
describe('ThingWorx Test', function () {
    it('Checks if title is valid.', function () {
		browser.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup')
			.pause(10000)
			.getTitle(function (err, title) {
				assert(title.indexOf('Audit') != -1);
				winston.log('info', title);});
	});
	
	it('Check if you can fill form and click button', function(done){
		browser.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup')
		.waitFor('#root_ContainedMashup-9_Textbox-9 input', 7000, function(err){
			browser.setValue('#root_ContainedMashup-9_Textbox-9 input', 'test123');
		})
		.waitFor('#root_ContainedMashup-9_Button-8 button', 7000, function(err){
			browser.click('#root_ContainedMashup-9_Button-8 button', function(err){
				browser.pause(7000).getAttribute('.tw-status-msg-box','style',function(err,attr){
					var str_attr = attr.toString();
					assert(str_attr.indexOf("display: none") == -1);
					if(str_attr.indexOf("display: none") == -1)
					{
						browser.waitFor('.close-sticky-btn', 4000 , function(err){
							browser.click('.close-sticky-btn').pause(2000).getAttribute('.tw-status-msg-box','style',function(err,attribute){
								var attr_str = attribute.toString();
								assert(attr_str.indexOf("display: none") > 0);
							});
						});
					}
				});
			});
		}).pause(3000).call(done);
	});
});