/* global browser */
/// <reference path="../typings/jasmine/jasmine.d.ts"/>
var assert = require('assert');
var winston = require('winston');
winston.add(winston.transports.File, { name: 'first-info-file', filename: './first-info.log', level: 'info' });
describe('ThingWorx Test', function () {
    it('Checks if title is valid.', function (done) {
		browser.url('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Runtime/index.html#mashup=AuditMashup')
			.pause(10000)
			.getTitle(function (err, title) {
				assert(title.indexOf('Audit') != -1);
				winston.log('info', title);}).call(done);
	});
});