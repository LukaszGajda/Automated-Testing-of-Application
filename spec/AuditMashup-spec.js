/* global browser */
/// <reference path="../typings/jasmine/jasmine.d.ts"/>
//assert to biblioteka używana do pisania testów jednostkowych
var assert = require('assert');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('spec/ThingWorxConfig.json', 'utf-8'));
var logon = config.Credentials.login + ':' + config.Credentials.password + '@';
describe('ThingWorx Test', function () {

	it('Check if you could add new folder to repository.', function (done) {
		browser.url('http://' + logon + config.Mashup + config.Mashups[0]).pause(5000);
		browser.waitForExist('div [title="NewFolder"]', 5000, true).then(function (value) {
			if (value) {
				browser.setValue('#root_ContainedMashup-9_Textbox-18 input', '/NewFolder').then(function () {
					browser.waitForValue('#root_ContainedMashup-9_Textbox-18 input', 5000).then(function () {
						browser.click('#root_ContainedMashup-9_Button-17 button', function () {
							browser.waitForExist('div [title="NewFolder"]', 5000).then(function (internal) {
								assert(internal);
								browser.call(done);
							});
						});
					});
				});
			}
			else {
				assert(!value);
				browser.call(done);
			}
		});
	});

	it('Check if you could remove folder from repository.', function (done) {
		browser.url('http://' + logon + config.Mashup + config.Mashups[0]).pause(5000);
		browser.waitForExist('div [title="NewFolder"]', 5000).then(function (value) {
			if (value) {
				browser.setValue('#root_ContainedMashup-9_Textbox-9 input', '/NewFolder').then(function () {
					browser.waitForValue('#root_ContainedMashup-9_Textbox-9 input', 5000).then(function () {
						browser.click('#root_ContainedMashup-9_Button-8 button', function () {
							browser.pause(2000).waitForExist('div [title="NewFolder"]', 5000).then(function (internal) {
								assert(!internal);
								browser.call(done);
							});
						});
					});
				});
			}
			else {
				assert(!value);
				browser.call(done);
			}
		});
	});

	it('Check if you could run audit', function (done) {
		browser.url('http://' + logon + config.Mashup + config.Mashups[0]).pause(5000);
		browser.click('.fileupload-file-input').then(function () {
			browser.pause(2000).element('.fileupload-file-input').keys('Mashups_wykresTest.xml').then(function () {
				browser.waitForValue('.fileupload-file-input', 5000).then(function (value) {
					if (value) {
						browser.click('.fileupload-submit-button', function () {
							browser.pause(2000).waitForExist('div [title="Mashups_wykresTest.xml"]', 5000).then(function (internal) {
								assert(!internal);
								browser.call(done);
							});
						});
					}
					else {
						console.log('Well done!');
						browser.call(done);
					}
				});
			});
		});
	});

});