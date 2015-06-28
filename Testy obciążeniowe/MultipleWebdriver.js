/// <reference path="../typings/node/node.d.ts"/>
var count = process.argv[2];
var option = process.argv[3];
var _count = parseInt(count);
var _option = parseInt(option);
var child = require('child_process').exec;
if (_count != NaN) {
    if (_option != NaN) {
        if (_option == 1) {
            for (var i = 0; i < _count; i++) {
                child('node ./browserOne.js');
            }
        }
        if (_option == 2) {
            for (var i = 0; i < _count; i++) {
                child('node ./browserTwo.js');
            }
        }
    }
}
    
