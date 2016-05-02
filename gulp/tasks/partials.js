var gulp = require('gulp');
var config = require('../config');

gulp.task('partials', ['clean'], function() {	
	return gulp.src(config.src.src + '/index.html')
		.pipe(gulp.dest(config.build.build + '/'));
});