var child = require('child_process').exec;
var one = child('node ./browserOne.js',function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('First process error: ', error);
    }
});
var two = child('node ./browserTwo.js',function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('Second process error: ', error);
    }
});
