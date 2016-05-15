var gulp = require('gulp');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var addsrc = require('gulp-add-src');
var order = require("gulp-order");
var concat = require('gulp-concat');
var config = require('../config');

gulp.task('js', ['clean'], function() {	
	var bundler = browserify({
	    entries: ['./' + config.src.app + '/app.js'],
	    debug: false
	});
	
	return bundler
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(addsrc([config.src.lib + '/**/*.js']))
		.pipe(order([		    
		    config.src.lib + '/three/three*.js',
		    config.src.lib + '/three/*geometry.js',
		    config.src.lib + '/three/*Controls.js',
		    config.src.lib + '/**/*.js',
		    config.src.app + '/**/*.js',
		    config.src.app + '/*.js'
		 ], {base: '.'}))
		.pipe(concat('app.js'))	
		.pipe(gulp.dest(config.build.js));
});