var gulp = require('gulp');
var rename = require('gulp-rename');
var config = require('../config');

gulp.task('copybuild', ['default'], function () {
	return gulp.src([config.build.build + '/*', config.build.build + '/**/*'])	
		.pipe(gulp.dest(config.dist.dist));	
});