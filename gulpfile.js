'use strict';
// generated on 2014-11-29 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 2 versions'))

        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('html', ['styles'], function () {
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(cssFilter)
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.highlight())
        .pipe(gulp.dest('demo'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'demo'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
});
