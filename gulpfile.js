'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var merge = require('merge-stream');
var params = $.util.env;

var config = {
    src: {
        base: 'src',
        styles: 'src/styles'
    },
    dist: {
        base: 'dist'
    },
    demo: {
        base: 'dist/demo',
        scripts: 'dist/demo/scripts',
        styles: 'dist/demo/styles'
    },
    autoprefixer: [
        'last 2 versions',
        'Explorer >= 10',
        'Firefox >= 25',
        'Safari >= 6'
    ]
};

gulp.task('styles', function() {
    var demo = sassProcess(config.src.styles + '/**/*.scss')
        .pipe($.plumber())
        .pipe(gulp.dest(config.demo.styles));

    var grid = sassProcess(config.src.styles + '/the-flex-grid.scss')
        .pipe($.plumber())
        .pipe(gulp.dest(config.dist.base))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dist.base));

    var grid_prefixed = sassProcess(config.src.styles + '/the-flex-grid.scss')
        .pipe($.plumber())
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.rename({ suffix: '.prefixed' }))
        .pipe(gulp.dest(config.dist.base))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dist.base))
        .pipe($.size({ title: 'styles' }));

    return merge(demo, grid, grid_prefixed);
});

function sassProcess(path) {
    return gulp.src(path).pipe(
        $.sass({
            precision: 10,
            outputStyle: params.production ? 'compressed' : 'expanded',
            includePaths: ['node_modules']
        }).on('error', $.sass.logError)
    );
}

gulp.task('html', function() {
    return gulp
        .src([config.src.base + '/**/*.html'])
        .pipe(gulp.dest(config.demo.base))
        .pipe($.size({ title: 'html' }));
});

gulp.task('clean', function(cb) {
    rimraf(config.dist.base, cb);
});

gulp.task('watch', ['build'], function() {
    browserSync.init({
        reloadDelay: 100,
        server: {
            baseDir: './' + config.demo.base
        }
    });

    gulp.watch([config.src.styles + '/**/*.scss'], ['styles']);
    gulp.watch([config.src.base + '/**/*.html'], ['html']);

    browserSync
        .watch(config.demo.base + '/**/*')
        .on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'html']);

gulp.task('default', ['build']);
