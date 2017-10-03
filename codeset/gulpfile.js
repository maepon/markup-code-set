"use strict"

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass =require('gulp-sass');
const postcss =require('gulp-postcss');
const autoprefixer =require('autoprefixer');
const watch = require('gulp-watch');
const cssmqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

const SRC = {
  css: 'src/assets/_scss/**/*.scss'
};

const DEST = {
  css: 'htdocs/assets/css/'
};

gulp.task('css', () => {

  const processors = [
    autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
    cssmqpacker
  ];

  gulp
    .src([SRC.css])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(DEST.css));
});

gulp.task('cssrelease', () => {

  const processors = [
    autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
    cssmqpacker,
    cssnano
  ];

  gulp
    .src([SRC.css])
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(DEST.css));
});

gulp.task('default', () => {
  gulp.start(['css']);

  watch(SRC.css, () => {
    gulp.start(['css']);
  });
});

gulp.task('release', () => {
  gulp.start(['cssrelease']);

});

