module.exports = function () {
    return {
        app: "./src/app.js",
        scripts: "./src/js/**/*.js",
        assets: "./src/assets/**/*",
        styles: "./src/scss/**/*.scss",
        appStyle: "./src/scss/styles.scss",
        index: './src/index.html',
        dist: "./dist"
    }
}