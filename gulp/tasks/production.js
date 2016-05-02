var gulp = require('gulp');

gulp.task('production', ['default', 'copybuild', 'uglify', 'minifycss']);