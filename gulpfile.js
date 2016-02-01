"use strict";

// Requires
var gulp = require('gulp'),
    port = 9000,
    connect = require('gulp-connect'),
    config = require('./gulp/config.gulp.js'),
    assets = require('./gulp/assets.gulp.js'),
    markup = require('./gulp/markup.gulp.js')(__dirname),
    styles = require('./gulp/styles.gulp.js'),
    scripts = require('./gulp/scripts.gulp.js'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),
    util = require('gulp-util');

/**
 * Asset Location Tasks
 * Build functions found in ./gulp/assets.gulp.js
 */

gulp.task('clean', assets.clean);
gulp.task('bower', assets.bower)
gulp.task('fonts', assets.font);
gulp.task('images', assets.img);
gulp.task('assets', function () {
    runSequence(['clean', 'bower', 'fonts', 'images']);
});

/**
 * Style Tasks
 * Build functions found in ./gulp/styles.gulp.js
 */

gulp.task('styles', styles);

/**
 * Application Tasks
 * Build functions found in ./gulp/scripts.gulp.js
 */

gulp.task('app', scripts.app);
gulp.task('vendor', scripts.vendor);
gulp.task('vendor:move', scripts.move);

/**
 * Markup Tasks
 * Build functions found in ./gulp/markup.gulp.js
 */

gulp.task('markup', markup);

/**
 * Watch tasks
 */

gulp.task('watch:markup', function () {
    return gulp.watch([
        'src/views/*.jade',
        'src/modules/**/*.jade',
        'src/components/**/*.jade'
        ], ['markup']);
});

gulp.task('watch:styles', function () {
    return gulp.watch([
        'src/scss/vendor/*.scss',
        'src/scss/settings/*.scss',
        'src/components/**/*.scss',
        'src/modules/**/*.scss',
        'src/scss/bundle.scss'
        ], ['styles']);
});

gulp.task('watch:app', function() {
    return gulp.watch([
    'src/init/init.js',
    'src/services/**/*.js',
    'src/components/**/*.js',
    'src/modules/**/*.js'
    ], ['app']);
});

/**
 * Combined tasks
 */

gulp.task('scripts', function () {
    runSequence(
        ['vendor', 'app', 'vendor:move']
    );
});

gulp.task('watch', function () {
    runSequence(
        ['watch:app', 'watch:styles', 'watch:markup']
    );
});

gulp.task('build', function () {
    runSequence(
        'clean',
        'fonts',
        'images',
        'styles',
        'scripts',
        'markup'
    );
});

// Server
gulp.task('server', function () {
    connect.server({
        port: port,
        root: 'app/public'
        //livereload: true
    });

    notify({ message: 'Server started at localhost:' + port + '...' });
});

gulp.task('dev', function () {
    runSequence(
        'build',
        'watch'
    );
});

function onError(err) {
    var thisError = err.message;
    util.beep();
    util.log(util.colors.red('Error'), thisError);
}