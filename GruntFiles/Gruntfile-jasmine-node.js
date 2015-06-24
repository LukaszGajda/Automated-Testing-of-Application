module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine_node: {
			options: {
				forceExit: true,
				matchall: false,
				extensions: 'js',
				specNameMatcher: 'spec'
			},
			all: ['TWxPDataExportRepository-spec.js','KpnSensor-01-spec.js']
		}
	});
	grunt.loadNpmTasks('grunt-jasmine-node');	
	grunt.registerTask('default', ['jasmine-node']);
};
