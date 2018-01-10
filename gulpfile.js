'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var server = require("browser-sync").create();
var del = require("del");
var run = require("gulp-run-sequence");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var minify = require("gulp-csso");

gulp.task('style', function () {
    return gulp.src('app/sсss/**/style.sсss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(),
        mqpacker({
            sort: false
        })
       ]))
        .pipe(gulp.dest('build/css'))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("html", function () {
    gulp.src("*.html")
        .pipe(gulp.dest("build/"));
});

gulp.task('serve', ['style'], function () {
    browserSync.init({
        server: 'app/'
    });
    gulp.watch('app/sсss/**/*.sсss', ['style']);
    gulp.watch('*.html')
        .on('change', browserSync.reload);
});

gulp.task('copy', function () {
    return gulp.src([
        'fonts/**/*/*.{woff, woff2}',
        'img/**',
        'js/**',
        '*.html'
    ], {
        base: 'app'
    })
        .pipe(gulp.dest('build'));
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task ('build', function (fn) {
  run(
      'clean',
      'copy',
      'style',
      'images',
      'symbols',
      fn
  );
});
