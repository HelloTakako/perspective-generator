const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

function style() {
  // place code for your default task here
  return (
      gulp
        .src('./src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css/'))
  );
}
function watch(){
      gulp.watch('./src/scss/*.scss', style)
}

exports.style = style;
exports.watch = watch;