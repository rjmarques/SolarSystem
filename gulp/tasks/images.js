var gulp = require('gulp');
var rename = require('gulp-rename');
var config = require('../config');

gulp.task('images', ['clean'], function () {
	return gulp.src([config.src.img + '/*'])	
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest(config.build.img));	
});