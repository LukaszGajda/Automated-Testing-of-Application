module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		parameter: {
			first: {
				tests: ['./spec/serialnet-spec.js', './spec/github-spec.js']
			},
			second: {
				tests: ['./spec/github-spec.js']
			}
		},
		execute: {
			target: {
				src: ['./MultipleGruntInstance.js']
			}
		},
		'start-selenium-server': {
			dev: {
				options: {
					downloadUrl: 'http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar',
					downloadLocation: './',
					serverOptions: {},
					systemProperties: {}
				}
			}
		},
		'stop-selenium-server': {
			dev: {

			}
		},
		webdriver: {
			githubTest:{
				tests:['./spec/serialnet-spec.js','./spec/github-spec.js','./spec/first-spec.js']
			},
			options: {
				desiredCapabilities: {
					browserName: 'chrome'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-webdriver');
	grunt.loadNpmTasks('grunt-selenium-server');
	//run node js files
	grunt.registerTask('Exec', ['execute']);
	//run selenium server other task and stop selenium server
	grunt.registerTask('devUI', 'run selenium server and phpunit', function () {
		grunt.task.run(['start-selenium-server:dev', 'execute', 'stop-selenium-server:dev']);
	});
	// run only one task at time from webdriver
	grunt.registerTask('default', ['webdriver']);
	//you can run webdriver with your desire configuration use --target=first or use --target=second
	grunt.registerTask('RunTest', 'Change parameter', function () {
		var option = grunt.option('target');
		var parameter = grunt.config('parameter');
		grunt.config('webdriver.githubTest.tests', parameter[option].tests);
		grunt.task.run('webdriver');
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