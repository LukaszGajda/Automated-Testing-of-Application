module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		run: {
			exec: {
				args: ['MultiplePhantom.js', '5']
			}
		}
	});
	grunt.loadNpmTasks('grunt-run');
	//run phantom tasks
	grunt.registerTask('phantom', ['run:exec']);
};