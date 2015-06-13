var frisby = require('frisby');
var fs = require('fs');
var logon = config.Credentials.login + ':' + config.Credentials.password + '@';
var config = JSON.parse(fs.readFileSync('spec/ThingWorxConfig.json','utf-8'));
frisby.create('Check length of measure properties for KNPSensor')
.get('http://' + logon + config.Thing +'KpnSensor-01/Services/GetMeasurementProperties?method=post&Accept=application/json')