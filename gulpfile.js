var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemap = require("gulp-sourcemaps");

function style() {
  // place code for your default task here
  return (
      gulp
        .src("./src/scss/*.scss")
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(gulp.dest("./public/css/"))
  );
}
function watch(){
      gulp.watch("./src/scss/*.scss", style)
}

exports.style = style;
exports.watch = watch;