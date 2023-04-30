const { src, dest, series, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const gulpif = require("gulp-if");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

const srcFolder = "./src";
const buildFolder = "./build";
let isProd = false;

const clean = () => {
  return del([buildFolder]);
};

const html = () => {
  return src(`${srcFolder}/*.html`)
    .pipe(
      gulpif(
        isProd,
        htmlmin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
};

const json = () => {
  return src(`${srcFolder}/*.json`)
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src(`${srcFolder}/css/**/*.css`, { sourcemaps: !isProd })
    .pipe(
      plumber(
        notify.onError({
          title: "CSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
      })
    )
    .pipe(
      gulpif(
        isProd,
        cleanCSS({
          level: 2,
        })
      )
    )
    .pipe(dest(`${buildFolder}/css`, { sourcemaps: "." }))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(`${srcFolder}/js/script.js`)
    .pipe(
      plumber(
        notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(gulpif(isProd, uglify()))
    .pipe(dest(`${buildFolder}/js`))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`,
    },
  });
  watch(`${srcFolder}/css/**/*.css`, styles);
  watch(`${srcFolder}/js/**/*.js`, scripts);
  watch(`${srcFolder}/*.html`, html);
  watch(`${srcFolder}/*.json`, json);
};

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(clean, html, scripts, styles, json, watchFiles);

exports.build = series(toProd, clean, html, scripts, styles, json);
