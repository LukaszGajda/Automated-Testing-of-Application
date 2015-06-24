module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		webdriver: {
			githubTest: {
				tests: ['./spec/*.js']
			},
			options: {
				desiredCapabilities: {
					browserName: 'chrome'
				}
			}
		}
	});	
	grunt.loadNpmTasks('grunt-webdriver');
	grunt.registerTask('default', ['webdriver']);
};

