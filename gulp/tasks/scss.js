var gulp = require('gulp');
var compass = require('gulp-compass');
var config = require('../config');
var path = require('path');

gulp.task('scss', ['clean', 'images'], function() {	
    return gulp.src('./' + config.src.scss + '/app.scss')
    	.pipe(compass({
    		project: path.join(__dirname, '../../'),
    		css: config.build.css,
    		sass: config.src.scss,
    		image: config.build.img,    	
    		relative: true,
    		comments: false
    	}))
        .pipe(gulp.dest(config.build.css));
});