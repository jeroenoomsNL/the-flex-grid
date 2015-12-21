'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var argv = require('yargs').argv;

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return $.rubySass('src/styles/*.scss', {precision: 10, style: 'expanded'})
        .on('error', $.rubySass.logError)
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('html', ['styles'], function () {
    var demo = gulp.src('src/*.html')
        .pipe($.useref({searchPath: '{.tmp,src}'}))
        .pipe(gulp.dest('demo'))
        .pipe($.size());

    var grid = gulp.src('.tmp/styles/the-flex-grid.css')
        .pipe(gulp.dest('dist'))
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));

    var grid_prefixed = gulp.src('.tmp/styles/the-flex-grid.css')
        .pipe($.autoprefixer('last 2 versions'))     
        .pipe($.rename({suffix: '.prefixed'}))
        .pipe(gulp.dest('dist'))
        .pipe($.csso())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
   
    return merge(demo, grid, grid_prefixed);
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'demo', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('src'))
        .use(serveStatic('.tmp'))

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
    server.listen();

    // watch for changes
    gulp.watch([
        'src/*.html',
        '.tmp/styles/**/*.css',
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('src/styles/**/*.scss', ['styles']);
});

gulp.task('deploy', function() {

    argv.message = argv.m || argv.message;

    var options = {};
    options.message = argv.message || 'Update '+ new Date();

    return gulp.src('./demo/**/*')
        .pipe($.ghPages(options));
});

