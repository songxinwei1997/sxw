var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
gulp.task('server', ['sass'], function () {
    gulp.src('src')
    .pipe(server({
        port:9090,
        middleware: function (req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico') {
                return false;
            }
            pathname = pathname === '/' ? '/index.html' : pathname;
            res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
        }
    }))
});

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/bulid/css'))
})
gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['sass'])
})
gulp.task('dev', ['server', 'sass'])