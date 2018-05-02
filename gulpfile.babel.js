import gulp from 'gulp';
import path from 'path';
import sass from 'gulp-sass';
import scsslint from 'gulp-scss-lint';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';

var paths = {
  app: 'dist/',
  css: 'dist/css/'
};

gulp.task('scsslint', () => {
  return gulp.src('src/**/*.scss').pipe(scsslint());
});

gulp.task('styles', ['scsslint'], () => {
  return gulp
    .src('./*.scss')
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

gulp.task('default', ['styles']);
