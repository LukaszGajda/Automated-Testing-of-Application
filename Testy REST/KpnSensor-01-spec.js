var frisby = require('frisby');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('spec/ThingWorxConfig.json','utf-8'));
var logon = config.Credentials.login + ':' + config.Credentials.password + '@';
frisby.create('Check length of measure properties for KNPSensor')
.get('http://' + logon + config.Thing +'KpnSensor-01/Services/GetMeasurementProperties?method=post&Accept=application/json')
.expectStatus(200)
.expectJSONLength("rows",11)
.expectJSONTypes("rows.*",{
	"isPersistent": Boolean,
	"isLogged":Boolean,
	"baseType": String,
	"description":String,
	"name":String,
	"isReadOnly":Boolean
})
.toss();