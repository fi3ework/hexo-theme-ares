const gulp = require('gulp'),
    babel = require('gulp-babel'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    del = require('del'),
    browserSync = require('browser-sync').create();

/* ========== develop ========== */

// babel
gulp.task('babel-js', function () {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./source/scripts/'));
});

// webpack
gulp.task('webpack', ['babel-js'], function () {
    return gulp.src('')
        .pipe(webpack({
            entry: {
                'main': './source/scripts/tag.js',
            },
            output: {
                filename: '[name].js',
            }
        }))
        .pipe(gulp.dest('./source/scripts/'));
});

// sass
gulp.task('sass', function () {
    return gulp.src('./src/scss/theme.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./source/css/'));
});

// browser-sync
gulp.task('reload-js', ['webpack'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('reload-css', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('reload-layout', function (done) {
    browserSync.reload();
    done();
});

gulp.task('dev', ['webpack', 'sass'], function () {
    browserSync.init({
        proxy: 'localhost:4000'
    });
    gulp.watch(['./src/scripts/**/*.js'], ['reload-js']);
    gulp.watch(['./src/scss/**/*.scss'], ['reload-css']);
    gulp.watch(['./layout/**/*.pug'], ['reload-layout']);
});


/* ========== bulid ========== */

// delete redundant js files 
gulp.task('del-js', ['webpack'], function (cb) {
    return del([
        './source/scripts/**/*',
        '!./source/scripts/main.js'
    ], cb);
});

// uglify
gulp.task('uglify-js', ['webpack'], function () {
    return gulp.src('./source/scripts/main.js').pipe(uglify())
        .pipe(gulp.dest('./source/scripts/'));
});

gulp.task('build', ['sass', 'del-js', 'uglify-js']);