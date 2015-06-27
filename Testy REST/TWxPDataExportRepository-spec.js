/// <reference path="../typings/jasmine/jasmine.d.ts"/>
var frisby = require('frisby');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('spec/ThingWorxConfig.json', 'utf-8'));
var logon = config.Credentials.login + ':' + config.Credentials.password + '@';

frisby.create('Create directory \"test\" in root folder of repository.')
	.get('http://' + logon + config.Thing + 'TWxPDataExportRepository'+
	'/Services/CreateFolder?method=post&path=/test&Accept=application/json')
	.expectStatus(200)
	.toss();

frisby.create('Check if directory \"test\" exist.')
	.get('http://' + logon + config.Thing + 'TWxPDataExportRepository'+
	'/Services/BrowseDirectory?method=post&path=/&Accept=application/json')
	.expectJSON("rows.?", {
	"fileType": "D",
	"name": "test",
	"path": "/test"
})
	.toss();

frisby.create('Delete directory \"test\".')
	.get('http://' + logon + config.Thing + 'TWxPDataExportRepository'+
	'/Services/DeleteFolder?method=post&path=/test&Accept=application/json')
	.expectStatus(200)
	.toss();

frisby.create('Check if directory \"test\" not exist.')
	.get('http://' + logon + config.Thing + 'TWxPDataExportRepository'+
	'/Services/BrowseDirectory?method=post&path=/&Accept=application/json')
	.afterJSON(function (json) {
	describe("A suite", function () {
		it("contains spec with an expectation", function () {
			var rows = [];
			rows = json.rows;
			var row = rows.filter(function (element, index, array) {
				if (element.name == "test" || element.fileType == "D") {
					return true;
				}
			});
			var len = row.length;
			expect(len).toBe(0);
		});
	});
}).toss();
