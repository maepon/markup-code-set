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
const packageImporter = require('node-sass-package-importer');
const bourbon    = require("bourbon");
const styleguide = require('sc5-styleguide');

const SRC = {
  css: 'src/assets/_scss/**/*.scss',
  cssDir: 'src/assets/_scss/'
};

const DEST = {
  css: 'htdocs/assets/css/',
  'styleguide': '_styleguide/'
};

const processors_dev = [
  autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
  cssmqpacker
];

const processors_release = [
  autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'iOS >= 9', 'Android >= 4.4']}),
  cssmqpacker,
  cssnano
];

const sassOption = {
  importer: packageImporter({
    extensions: ['.scss', '.css']
  }),
  includePaths: [bourbon.includePaths]
};

const styleguideOption = {
  title: 'Style Guide',
  server: true,
  port: 4000,
  rootPath: DEST.styleguide,
  overviewPath: DEST.styleguide + 'README.md'
};

gulp.task('css', () => {

  const processors = processors_dev;

  return gulp
    .src([SRC.css])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(sassOption))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(DEST.css));
});

gulp.task('cssrelease', () => {

  const processors = processors_release;

  return gulp
    .src([SRC.css])
    .pipe(sass(sassOption))
    .pipe(postcss(processors))
    .pipe(gulp.dest(DEST.css));
});

gulp.task('styleguide:generate', () =>{
  return gulp
    .src(SRC.css)
    .pipe(styleguide.generate(styleguideOption))
    .pipe(gulp.dest(DEST.styleguide));
});

gulp.task('styleguide:applystyles', () =>{
  const processors = processors_dev;

  return gulp
    .src(SRC.cssDir + 'style.scss')
    .pipe(sass(sassOption))
    .pipe(postcss(processors))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(DEST.styleguide));
});

gulp.task('default', () => {
  gulp.start(['css','styleguide']);

  watch(SRC.css, () => {
    gulp.start(['css']);
    gulp.start(['styleguide']);
  });
});

gulp.task('release', () => {
  gulp.start(['cssrelease']);
});

gulp.task('styleguide',['styleguide:generate','styleguide:applystyles']);
