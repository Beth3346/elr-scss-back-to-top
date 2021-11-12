const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const uglify = require("gulp-uglify");

var paths = {
  app: "dist/",
  css: "dist/css/",
  images: "dist/images/",
  js: "dist/scripts",
};

// Clean assets
function clean() {
  return del(["./dist"]);
}

// Copy HTML
function copyHtml() {
  return gulp.src(["./public/*.html"]).pipe(gulp.dest(paths.app));
}

function copyImages() {
  return gulp
    .src(["public/images/**/*.{gif,jpg,png,svg}"])
    .pipe(gulp.dest(paths.images));
}

function processScripts() {
  return gulp.src("public/script.js").pipe(uglify()).pipe(gulp.dest(paths.js));
}

function processStyles() {
  return gulp
    .src(["public/*.scss"])
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: ["node_modules"],
      })
        .on("error", sass.logError)
        .on("error", () => gulp.emit("error", new Error("scss compile error")))
    )
    .pipe(gulp.dest(paths.css))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(paths.css))
    .pipe(cleanCSS({ debug: true }))
    .pipe(gulp.dest(paths.css));
}

gulp.task("default", done => {
  copyImages();
  copyHtml();
  processStyles();
  // processScripts();
  // console.log({ styles });
  done();
});

exports.clean = clean;
exports.copyHtml = copyHtml;
exports.copyImages = copyImages;
