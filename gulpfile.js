var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('rimraf');

function err(error) {
    console.error('[ERROR]: ' + error.message);
    this.emit('end');
}

gulp.task('clean', function(cb) {
    rimraf('build', cb);
});

gulp.task('css', function() {
    return gulp.src(['./src/demo.less'])
        .pipe(plumber(err))
        .pipe(less({
            paths: [path.join(__dirname, 'src')],
            relativeUrls: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename(function(path) {
            path.basename += '-min';
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy', function() {
    return gulp.src(['./src/**/*.*', '!./src/**/*.less'])
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['clean', 'css', 'copy']);

gulp.task('watch', function() {
    gulp.watch([
        './src/**/*.less'
    ], ['css']);
    gulp.watch([
        './src/**/*.*', '!./src/**/*.less'
    ], ['copy']);
});