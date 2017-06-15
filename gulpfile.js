var gulp = require("gulp");
var browserSync = require("browser-sync");
var runCommand = require("gulp-run-command").default;

gulp.task("default", ["test", "app"])

gulp.task("app", function () {
    var browser = browserSync.create();

    return browser.init({
        server: {
            baseDir: ['./public', './js', './css', './img']
        },
        port: 8080,
    });
});

gulp.task('test', runCommand('./node_modules/.bin/karma start'));