const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

/* ========== develop ========== */
// sass
gulp.task('sass', function () {
    return gulp.src('./source/scss/theme.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./source/css/'));
});

// browser-sync
gulp.task('reload-css', ['sass'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('reload-layout', function (done) {
    browserSync.reload();
    done();
});

gulp.task('dev', ['sass'], function () {
    browserSync.init({
        proxy: 'localhost:4000'
    });
    gulp.watch(['./source/scss/**/*.scss'], ['reload-css']);
    gulp.watch(['./layout/**/*.ejs'], ['reload-layout']);
});


/* ========== bulid ========== */

gulp.task('build', ['sass']);