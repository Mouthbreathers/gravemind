var gulp = require('gulp'),
    port = 9000,
    config = require('./config.gulp.js'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    util = require('gulp-util');

module.exports = {
    app: scriptsApp,
    vendor: scriptsVendor
};

function scriptsApp(){
    return gulp.src([
            'src/init/init.js',
            'src/services/**/*.js',
            'src/modules/**/*.js'
        ]).pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.buildPath('js')));
}

function scriptsVendor(client){
    return gulp.src([
            '/src/vendor/lodash/lodash.min.js',
            'src/vendor/jquery/dist/jquery.min.js'
        ]).pipe(plumber({errorHandler: onError}))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.buildPath('js')));
}

function onError(err) {
    var thisError = err.message;
    util.beep();
    util.log(util.colors.red('Error'), thisError);
}