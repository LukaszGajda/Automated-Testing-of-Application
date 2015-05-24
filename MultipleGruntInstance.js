var child = require('child_process').exec;
child('jasmine-node spec',function(error, stdout, stderr) {
    if (error !== null) {
        console.log('Jasmine node process error: ', error);
    }
});
//child('jasmine-node \'Test part 1\' ',function(error, stdout, stderr) {
//    if (error !== null) {
//        console.log('Second process error: ', error);
//    }
//});
//child('jasmine-node \'Test part 2\' ',function(error, stdout, stderr) {
//    if (error !== null) {
//        console.log('Second process error: ', error);
//    }
//});
//child('jasmine-node \'Test part 3\' ',function(error, stdout, stderr) {
//    if (error !== null) {
//        console.log('Second process error: ', error);
//    }
//});
