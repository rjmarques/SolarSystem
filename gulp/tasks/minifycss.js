var gulp = require('gulp');
var minifycss = require('gulp-clean-css')
var config = require('../config');

gulp.task('minifycss', ['copybuild'], function() {	
	return gulp.src(config.dist.css + "/*.css")
		.pipe(minifycss())
		.pipe(gulp.dest(config.dist.css));	
});