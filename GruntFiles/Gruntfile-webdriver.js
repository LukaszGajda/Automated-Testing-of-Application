module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		webdriver: {
			githubTest: {
				tests: ['./spec/serialnet-spec.js', './spec/github-spec.js', './spec/first-spec.js']
			},
			options: {
				desiredCapabilities: {
					browserName: 'chrome'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-webdriver');
	// run only one task at time from webdriver
	grunt.registerTask('default', ['webdriver']);
};