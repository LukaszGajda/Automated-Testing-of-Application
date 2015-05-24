module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		parameter:{
			first:{
				tests: ['./spec/serialnet-spec.js','./spec/github-spec.js']
			},
			second:{
				tests: ['./spec/github-spec.js']
			}
		},
		execute:{
			target: {
            src: ['./MultipleGruntInstance.js']
        }
		},
		webdriver:{
			options: {
				desiredCapabilities: {
					browserName: 'chrome'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-webdriver');
    grunt.registerTask('Exec',['execute']);
	grunt.registerTask('default', ['webdriver']);
	grunt.registerTask('RunTest','Change parameter',function(){
		var option = grunt.option('target');
		var parameter = grunt.config('parameter');
		grunt.config('webdriver.githubTest.tests',parameter[option].tests);
		grunt.task.run('webdriver');
	});
}
