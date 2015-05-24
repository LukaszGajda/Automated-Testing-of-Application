var child = require('child_process').exec;
var one = child('grunt RunTest --target=first',function(error, stdout, stderr) {
    console.log(stdout);
    // console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('First process error: ', error);
    }
});
var two = child('grunt RunTest --target=first',function(error, stdout, stderr) {
    console.log(stdout);
    // console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('Second process error: ', error);
    }
});
