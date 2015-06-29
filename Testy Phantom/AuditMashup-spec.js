/// <reference path="../typings/jquery/jquery.d.ts"/>
/* global phantom */
var page = require('webpage').create();
var fs = require('fs');
var config = JSON.parse(fs.read('spec/ThingWorxConfig.json'));
var logon = config.Credentials.login + ':'
	+ config.Credentials.password + '@';
var url = "http://" + logon + config.Mashup + config.Mashups[0];
page.open(url, function () {
	var ua = page.includeJs("http://ajax.googleapis.com" +
		"/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
			page.evaluate(function () {
				var textbox = $("#root_ContainedMashup-9_Textbox-9 input");
				textbox.val('test123');
				var button = $(".close-sticky-btn");
				button.click();
				var messageBox = $(".tw-status-msg-box");
				return messageBox.delay(5000).attr("style");
			});
			console.log(ua);
			phantom.exit();
		});
});
