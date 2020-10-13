const gulp = require("gulp");

const htmlmin = require("gulp-htmlmin");
//1、拷贝.html代码
gulp.task("copy-html", function () {
  return gulp
    .src("*.html")
    .pipe(
      htmlmin({
        removeEmptyAttibutes: true, // 移出所有空属性
        collapseWhitespace: true, // 压缩 html
      })
    )
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
});

//处理图片 imagesmin  对图片再次进行压缩
gulp.task("images", function(){
  return gulp.src("./images/*.{jpg,png}")
  .pipe(gulp.dest("dist/images"))
  .pipe(connect.reload());
})

//处理js文件
gulp.task("scripts", function(){
  return gulp.src(["./js/*.js", "!gulpfile.js"])
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());
})

//处理数据源
gulp.task("data", function(){
  return gulp.src(["./json/*.json", "!package.json"])
  .pipe(gulp.dest("dist/data"))
  .pipe(connect.reload());
})

//处理css样式
const sass = require("gulp-sass");
sass.compiler = require('node-sass');
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("sassIndex", function(){
  return gulp.src("./scss/index.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest("dist/css"))
  .pipe(minifycss())
  .pipe(rename("index.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
gulp.task("sassIndent", function(){
  return gulp.src("./scss/indent.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest("dist/css"))
  .pipe(minifycss())
  .pipe(rename("indent.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
gulp.task("sassReset", function(){
  return gulp.src("./scss/reset.scss")
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest("dist/css"))
  .pipe(minifycss())
  .pipe(rename("reset.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("build", ["copy-html", "images", "scripts", "data", "sassIndex", "sassRIndent","sassReset"],console.log("转载完成"));


//编写监听
gulp.task("watch", function(){
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch("*.{jpg,png}", ["images"]);
  gulp.watch(["*.js", "!gulpfile.js"], ['scripts']);
  gulp.watch(["*.json", "!package.json"], ['data']);
  gulp.watch("./scss/index.scss", ["sassIndex"]);
  gulp.watch("./scss/indent.scss", ["sassIndent"]);
  gulp.watch("./scss/reset.scss", ['sassReset']);
})


const connect = require("gulp-connect");
gulp.task("server", function(){
  connect.server({
    root: "dist",
    port: 3000,  //0-65535
    livereload: true
  })
})

//同时启动服务和监听

gulp.task("default", ['watch', 'server']);
