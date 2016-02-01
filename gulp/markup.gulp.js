var gulp = require('gulp'),
    port = 9000,
    config = require('./config.gulp.js'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    path = require('path'),
    util = require('gulp-util');

module.exports = function(dir){

    return markupPage;

    function markupPage(){
        return gulp.src([
                'src/views/*'
            ]).pipe(plumber({errorHandler: onError}))
            .pipe(jade({
                pretty: true
            }))
            .pipe(gulp.dest(config.buildPath('root')));
    }

    function onError(err) {
        var thisError = err.message;
        util.beep();
        util.log(util.colors.red('Error'), thisError);
    }
}