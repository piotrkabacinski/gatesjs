var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('minify', function () {
    return gulp.src('src/gates.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify']);
