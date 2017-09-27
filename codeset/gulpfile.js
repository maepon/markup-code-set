"use strict"

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass =require('gulp-sass')
const postcss =require('gulp-postcss')
const autoprefixer =require('autoprefixer')
const filter = require('gulp-filter')
const watch = require('gulp-watch')
const watch = require('gulp-watch')
const cssmqpacker = require('css-mqpacker')

const SRC = {
  css: 'src/assets/scss/**/*.scss'
}

const DEST = {
  css: 'htdocs/assets/css/'
}

gulp.task('css', () => {
  const processors = [
    autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
    cssmqpacker
  ]

  gulp
    .src([SRC.css])
    .pipe(plumber())
    // .pipe(filter(file => !/\/_/.test(file.path)))
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(DEST.css))
})

gulp.task('default', () => {
  gulp.start(['css'])

  watch(SRC.css, () => {
    gulp.start(['css'])
  })
})

