const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const scsslint = require('gulp-scss-lint');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

var paths = {
  app: 'dist/',
  css: 'dist/css/'
};

gulp.task('default', () => {
  return gulp
    .src('./*.scss')
    .pipe(scsslint())
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: ['node_modules']
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(paths.css))
    .pipe(
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest(paths.css))
    .pipe(cleanCSS({ debug: true }))
    .pipe(gulp.dest(paths.css));
});
