'use strict';

// Include gulp
var gulp = require('gulp');

// Include our plugins
var autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps');

// Compile our Sass
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

// Validate our Javascript
gulp.task('js-lint', function () {
    return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Validate our Sass
gulp.task('scss-lint', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(scsslint());
});
// Watch files for changes
gulp.task('watch', function () {
    // Styles
    gulp.watch('./scss/**/*.scss', ['scss-lint', 'sass']);

    // Scripts
    gulp.watch(['js/**/*.js', '!js/**/*.min.js'], ['js-lint']);
});