var gulp = require('gulp'),
    port = 9000,
    config = require('./config.gulp.js'),
    bower = require('gulp-bower'),
    gulpIf = require('gulp-if'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util');

module.exports = {
    bower: assetsBower,
    font: assetsFont,
    clean: assetsClean,
    img: assetsImg
}


function assetsBower() {
    return bower()
        .pipe(plumber({errorHandler: onError}));
}

function assetsClean(){
    del([
        config.buildPath('root') + '*',
    ]);
}

function assetsFont(client) {
    return gulp.src([
            'src/fonts/*'
        ]).pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(config.buildPath('fonts')))
}

function assetsImg(client) {
    return gulp.src([
            'src/img/**/*'
        ]).pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(config.buildPath('img')));
}

function onError(err) {
    var thisError = err.message;
    util.beep();
    util.log(util.colors.red('Error'), thisError);
}

