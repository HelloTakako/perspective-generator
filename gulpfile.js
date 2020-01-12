var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

function style() {
  // place code for your default task here
  return (
      gulp
        .src("./src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css/"))
  );
}
function watch(){
      gulp.watch("./src/scss/*.scss", style)
}

exports.style = style;
exports.watch = watch;