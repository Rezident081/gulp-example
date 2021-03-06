const gulp = require("gulp");
const postcss = require("gulp-postcss");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const cssnano = require("cssnano");
const connect = require("gulp-connect");
const bro = require("gulp-bro");
const rename = require("gulp-rename")
const copy = require("gulp-copy");
const autoprefixer = require("autoprefixer");
const stringify = require("stringify");
const babelify = require("babelify");
const config = require("./config")();

gulp.task("build:styles", () => {
    return gulp.src(config.appStyle)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer, cssnano])
            .on("error", console.log)
        )
        .pipe(rename({
            extname: ".css"
        }))
        .pipe(gulp.dest(config.dist + "/css"))
        .pipe(connect.reload());
});

gulp.task("build:js", () => {
    return gulp.src(config.app)
        .pipe(bro({
            transform: [
                babelify.configure({ presets: ['env'] }),
                ["stringify", {
                    appliesTo: {
                        includeExtensions: [".html"]
                    }
                }]
            ]
        })
        .on("error", (err) => console.log(err) ))
        .pipe(gulp.dest(config.dist + "/js"))
        .pipe(connect.reload());
});

gulp.task("copy:files", () => {
    return gulp.src(config.assets)
        .pipe(gulp.dest(config.dist + "/assets"))
});

gulp.task('build:html', () => {
    return gulp.src(config.index)
        .pipe(gulp.dest(config.dist))
        .pipe(connect.reload());
});

gulp.task("watch:styles", ["build:styles"], () => {
    gulp.watch(config.styles, ["build:styles"]);
});

gulp.task("watch:js", ["build:js"], () => {
    gulp.watch(config.scripts, ["build:js"]);
});

gulp.task("watch:files", ["copy:files"], () => {
    gulp.watch(config.assets, ["copy:files"]);
});

gulp.task("watch:html", ["build:html"], () => {
    gulp.watch(config.index, ["build:html"]);
});

gulp.task("serve", ["watch:styles", "watch:js", "watch:html", "watch:files"], () => {
    connect.server({
        root: "dist",
        port: 8080,
        livereload: true
    })
});

gulp.task("default", ["serve"]);