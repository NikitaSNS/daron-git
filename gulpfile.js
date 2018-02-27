const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const inject = require('gulp-inject');

gulp.task('html', function () {
    return gulp.src('client/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
});

gulp.task('js', function(){
    return gulp.src('client/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('sass', function () {
    return gulp.src('client/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('inject', function () {
    const target = gulp.src('./build/index.html');
    const sources = gulp.src(['build/css/*.css', 'build/js/*.js'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['sass', 'js', 'html'], () => {
    gulp.start('inject');
});
