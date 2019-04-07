const less = require('gulp-less');
const path = require('path');
const { src, dest, task, series, watch } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');

let serverTask = () => {
  browserSync.init({
      server: {
          baseDir: "./dist/"
      }
  });
};

let lessTask = () =>  {
  return src('./src/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));
};

let jsTask = () => {
  return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'));
};

let imgTask = () => {
  return src('./src/img/*')
          .pipe(imagemin())
          .pipe(dest('dist/img'));
};

let htmlTask = () => {
  return src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
};

task('default', series(lessTask, jsTask, imgTask, htmlTask));

exports.serve = () => {
  serverTask();
  watch('./src/less/*.less', lessTask);
  watch('./src/js/*.js', jsTask);
  watch('./src/*.html', htmlTask);
};
