module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		run: {
			exec: {
				args: ['MultipleWebdriver.js', '5', '1']
			}
		},
		'start-selenium-server': {
			dev: {
				options: {
					downloadUrl: 'http://selenium-release.storage.googleapis.com'
					+ '/2.45/selenium-server-standalone-2.45.0.jar',
					downloadLocation: './'
				}
			}
		},
		'stop-selenium-server': {
			dev: {

			}
		}
	});
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-selenium-server');
	//run selenium server other task and stop selenium server
	grunt.registerTask('LoadTest', 'run selenium server and webdriverio', function () {
		grunt.task.run(['start-selenium-server:dev', 'run:exec', 'stop-selenium-server:dev']);
	});
	
	// stop selenium server if error occure while working with grunt
	var seleniumChildProcesses = {};
    grunt.event.on('selenium.start', function (target, process) {
		grunt.log.ok('Saw process for target: ' + target);
        seleniumChildProcesses[target] = process;
    });

    grunt.util.hooker.hook(grunt.fail, function () {
		// Clean up selenium if we left it running after a failure.
		grunt.log.writeln('Attempting to clean up running selenium server.');
		for (var target in seleniumChildProcesses) {
			grunt.log.ok('Killing selenium target: ' + target);
			try {
				seleniumChildProcesses[target].kill('SIGTERM');
			}
			catch (e) {
				grunt.log.warn('Unable to stop selenium target: ' + target);
			}
		}
	});
};