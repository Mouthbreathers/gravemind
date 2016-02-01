var gulp = require('gulp'),
    port = 9000,
    config = require('./config.gulp.js'),
    gulpIf = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    globSass = require('gulp-sass-glob-import'),
    neat = require('node-neat'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    util = require('gulp-util');

module.exports = stylesCompiler;

function stylesCompiler() {
    return gulp.src([
            'src/scss/bundle.scss',
            'src/scss/ie.scss'
        ]).pipe(globSass())
        .pipe(sass({
            includePaths: [
                bourbon.includePaths,
                neat.includePaths[1]
            ]
        }))
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
        }))
        .pipe(gulp.dest(config.buildPath('css')));
}

function onError(err) {
    var thisError = err.message;
    util.beep();
    util.log(util.colors.red('Error'), thisError);
}