var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('../config');

gulp.task('uglify', ['copybuild'], function() {	
	return gulp.src(config.dist.js + "/*.js")
		.pipe(uglify())
		.pipe(gulp.dest(config.dist.js));	
});