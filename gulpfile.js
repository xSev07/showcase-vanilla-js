"use strict";

var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var htmlmin = require("gulp-htmlmin");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("markup/source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("markup/build/css"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
      "markup/source/fonts/**/*.{woff,woff2}",
      "markup/source/ico/**",
	  "markup/source/css/**",
    ], {
      base: "markup/source"
    })
    .pipe(gulp.dest("markup/build"));
})

gulp.task("images", function () {
  return gulp.src([
    "markup/source/img/**/*.{png,jpg,svg}",
    "!markup/source/img/sprite/**"
  ])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("markup/build/img"));
})

gulp.task("webp", function () {
  return gulp.src("markup/source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("markup/build/img"));
})

gulp.task("sprite", function () {
  return gulp.src("markup/source/img/sprite/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("markup/build/img"));
})

gulp.task("clean", function () {
  return del("markup/build");
})

gulp.task("html", function () {
  return gulp.src("markup/source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("markup/build"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy",
    "css",
    "sprite",
    "images",
    "webp",
    "html"
  ));

gulp.task("server", function () {
  server.init({
    server: "markup/build/"
  });

  gulp.watch("markup/source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("markup/source/img/sprite/*.svg", gulp.series("sprite", "refresh"));
  gulp.watch("markup/source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
