var gulp = require('gulp');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var config = require('../config');
var path = require('path');

gulp.task('scss', ['clean', 'images'], function() {	
    return gulp.src('./' + config.src.scss + '/base.scss')
    	.pipe(compass({
    		project: path.join(__dirname, '../../'),
    		sass: config.src.scss,
    		image: config.build.img,    	
    		relative: true,
    		comments: false
    	}))
    	.pipe(rename({
    		basename: "app",
    	    extname: ".css"
		}))
        .pipe(gulp.dest(config.build.css));
});