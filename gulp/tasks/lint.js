var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../config');

gulp.task('lint', function() {
	var sourceFiles = [
        config.src.app + '/*.js', 
	    config.src.app + '/**/*.js'
	];
	
	return gulp.src(sourceFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));	
});