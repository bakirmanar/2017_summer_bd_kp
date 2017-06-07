var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    htmlmin = require('gulp-htmlmin'),
    w3cjs = require('gulp-w3cjs'),
    through2 = require('through2'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),

    reload = browserSync.reload;


var SRC = './frontend/';
var DIST = './dist/';

gulp.task('lint', function () {
    return gulp.src(SRC + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('w3cjs', function () {
    gulp.src(SRC + '*.html')
        .pipe(w3cjs())
        .pipe(through2.obj(function (file, enc, cb) {
            cb(null, file);
            if (!file.w3cjs.success) {
                throw new Error('HTML validation error(s) found');
            }
        }));
});

gulp.task('clean', function () {
    return gulp.src(['dist', 'out'], {read: false})
        .pipe(clean());
});

gulp.task('css', function () {
    var options = {
        inlineImports: true,
        rebaseUrls: false,
        includePaths: [],
        basedir: null
    };

    function addCss(name) {
        gulp.src([/*'./bower_components/bootstrap/dist/css/bootstrap.min.css',*/
            SRC + 'assets/css/' + name + '.css'])
            .pipe(gulp.dest(DIST + 'assets/css/'))
            .pipe(concatCss(name + '.min.css', options))
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(DIST + 'assets/css/'));
    }

    addCss('styles');
});


gulp.task('less', function () {
    function addLess(url) {
        gulp.src(url)
            .pipe(gulp.dest(DIST + 'assets/css'))
            .pipe(less())
            .pipe(gulp.dest(DIST + 'assets/css'))
            .pipe(browserSync.stream());
    }

    addLess(SRC + 'assets/css/styles.less');
    // addLess(SRC + 'css/colorChange.less');
});

gulp.task('lessMaps', function () {
    gulp.src(SRC + 'assets/css/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(DIST + 'assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('destHTML', function () {
    gulp.src([SRC + '**/*.html', '!' + SRC + 'index1.html'],  {base: SRC})
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.stream());
});

gulp.task('minHTML', function () {
    return gulp.src([SRC + '*.html', '!' + SRC + 'invalid.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(DIST));
});

gulp.task('js', function () {
    gulp.src(SRC + '**/*.js')
        .pipe(gulp.dest(DIST));
});

gulp.task('libsJs', function () {
    gulp.src(['./bower_components/**/*.*',
        '!./bower_components/**/*runt*',
        '!./bower_components/**/*ulp*',
        '!./bower_components/**/demo.*',
        '!./bower_components/**/*.html',
        '!./bower_components/**/*.json',
        '!./bower_components/**/public'])
        .pipe(gulp.dest(DIST + 'assets/plugins/'));
});

gulp.task('jsMin', function () {
    function addMinJs(name, url) {
        gulp.src(url)
            .pipe(concat(name + '.min.js'))
            .pipe(gulp.dest(DIST + 'assets/js'))
            .pipe(browserSync.stream());
    }
    function addJs(name, url) {
        gulp.src(url)
            .pipe(concat(name + '.min.js'))
            .pipe(gulp.dest(DIST + 'assets/js'))
            .pipe(browserSync.stream());
    }

    addMinJs('scripts', ['./bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/angular-socket-io/socket.min.js',
        './bower_components/less/dist/less.min.js',
        './bower_components/parallax/deploy/jquery.parallax.min.js',
        './node_modules/angular-ui-notification/dist/angular-ui-notification.min.js',
        SRC + 'assets/js/scripts.js',
        SRC + 'assets/js/libs/*.js']);

    addJs('app', [SRC + '*.js',
        SRC + 'app/**/*.js']);
});

gulp.task('copy', function () {
    gulp.src([SRC + 'assets/images/**/*',
        SRC + 'css/custom.css',
        SRC + 'assets/fonts/*',
        SRC + 'assets/favicon/*',
        SRC + '*.ico'], {base: SRC})
        .pipe(gulp.dest(DIST));

    gulp.src( './bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest(DIST + 'assets/fonts/'));

});



gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: DIST
        },
        port: 1337
    });
    gulp.watch(SRC + 'assets/css/*.less', ['less']).on('change', reload);
    gulp.watch(SRC + 'assets/css/*.css', ['css']).on('change', reload);
    gulp.watch(SRC + '**/*.html', ['destHTML']).on('change', reload);
    gulp.watch(SRC + '**/*.js', ['js']).on('change', reload);
    gulp.watch(SRC + '**/*.js', ['jsMin']).on('change', reload);
});

// Default
var runSequence = require('run-sequence');



gulp.task('build', function () {
    return runSequence(/*'w3cjs', 'lint',*/ 'clean', /*'minHTML',*/ 'destHTML', 'less', 'css', /*'lessMaps',*/ 'copy', /*'libsJs',*/ 'js', 'jsMin');
});
/*gulp.task('default', ['clean',  'html', 'css', 'fonts', 'imgMin','valid', 'js', 'watch' ]);*/

// Watch
gulp.task('watch', function () {
  gulp.watch(SRC + 'assets/css/*.less', ['less']);
  gulp.watch(SRC + 'assets/css/*.css', ['css']);
  gulp.watch(SRC + '**/*.js', ['js']);
  gulp.watch(SRC + '**/*.js', ['jsMin']);
  gulp.watch(SRC + '**/*.html', ['destHTML']);
});

gulp.task('default', function () {
  return runSequence('build', 'watch')
});
