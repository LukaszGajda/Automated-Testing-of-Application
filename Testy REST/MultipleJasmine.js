/// <reference path="../typings/node/node.d.ts"/>
var count = process.argv[2];
var _count = parseInt(count);
var child = require('child_process').exec;
if (_count != NaN)
{
    for (var i = 0; i < _count; i++) {
        child('jasmine-node TWxPDataExportRepository-spec.js');
        }
}