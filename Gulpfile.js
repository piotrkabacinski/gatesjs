var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('minify', function () {
    return gulp.src('src/gates.js')
            .pipe(uglify())
            .pipe(rename('gates.min.js'))
            .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify']);
