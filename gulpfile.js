/**
 * Created by mayvelous on 15/09/15.
 */
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');

var paths = {
    temp: 'temp',
    tempVendor: 'temp/vendor',
    tempIndex: 'temp/vendor/index.html',

    index: 'app/index.html',
    appSrc: ['app/**/*', '!app/index.html'],
    bowerSrc: 'bower_components/**/*'
}

gulp.task('default', ['watch']);

gulp.task('watch', ['serve'], function(){
    gulp.watch(paths.appSrc, ['scripts']);
    gulp.watch(paths.bowerSrc, ['vendors']);
    gulp.watch(paths.index, ['copyAll']);
});

gulp.task('serve', ['copyAll'], function(){
    // Serving the temp files
    gulp.src(paths.temp)
        .pipe(webserver({
            open: true,
            // directoryListing: true
            livereload: true,
            proxies: [{
                source: '/api',
                target: 'http://localhost:1337'
            }]

        }));
});

gulp.task('copyAll', function(){
    // Copy the index file to temp folder
    var tempIndex = gulp.src(paths.index).pipe(gulp.dest(paths.temp));
    // Copy app src files to temp folder
    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));
    // mainBowerFiles will copy all the bower dependency files into destination specified.
    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));

    // Inject the temp/index.html with all the dependencies
    return tempIndex
        .pipe(inject(appFiles, {relative: true}))
        .pipe(inject(tempVendors, {relative: true, name: 'vendorInject'}))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('scripts', function(){
    // Copy the app source files into temp folder
    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));
    // Inject the temp/index.html with app dependencies
    return gulp.src(paths.tempIndex)
        .pipe(inject(appFiles, {relative: true}))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('vendors', function(){
    // mainBowerFiles will copy all the bower dependency files into destination specified.
    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempVendor));
    // Inject the temp/index.html with vendor dependencies
    return gulp.src(paths.tempIndex)
        .pipe(inject(tempVendors, {relative: true, name: 'vendorInject'}))
        .pipe(gulp.dest(paths.temp));
});



gulp.task('clean', function(){
    del([paths.temp]);
});