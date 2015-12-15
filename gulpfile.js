var gulp = require("gulp");
var R = require('ramda');
var _ = require('lodash');
var sass = require('gulp-sass');
var gutil = require("gulp-util");
var webpack = require("webpack");
var config = require('./gulpConfig')(webpack);
var concatCss = require('gulp-concat-css');
var del = require('del');
var nodemon = require('gulp-nodemon');
var minifyHtml = require('gulp-minify-html');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var livereload = require('gulp-livereload');

// determine if we are in a production build
// gulp
var env = process.env.NODE_ENV || '';
var prod = (env === 'production' || false);

var beep = function() {
    var os = require('os');
    var file = 'gulp/error.wav';
    if (os.platform() === 'linux') {
        // linux
        exec("aplay " + file);
    } else {
        // mac
        console.log("afplay " + file);
        exec("afplay " + file);
    }
};

var tasks = {
    // cleaning up the dist folder more than likely
    clean : function() {
        del(config.clean)
    },


    lint: function() {
        return gulp.src([
            config.js.src
        ]).pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .on('error', function() {
                beep();
            });
    },

    //webpack build the js
    buildJs : function() {
        webpack(config.webpack, function(err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }
            gutil.log("[webpack]", stats.toString({

            }));
        });
    },

    buildImgs: function() {
        gulp.src(config.images.src)
            .pipe(gulp.dest(config.images.dist));
    },

    buildHtml: function() {
        //out source files
        var src = gulp.src(config.templates.src);

        if (prod) {
            // we want to minify html if we're in production build
            src.pipe(minifyHtml(config.templates.minify))
                .pipe(gulp.dest(config.templates.dist));
        } else {
            // we want to just the assets to the dist directory
            src.pipe(gulp.dest(config.templates.dist));
        }
    },

    // taking sass and turning it into css
    buildSass: function() {
        gulp.src(config.sass.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(concatCss('./bundle.css'))
            .pipe(gulp.dest(config.sass.dist));
    },

    vendorCss: function(){
        gulp.src(config.vendor.css)
            .pipe(gulp.dest(config.vendor.distCss));
    },

    vendorJs: function() {
        gulp.src(config.vendor.js)
            .pipe(gulp.dest(config.vendor.distJs))
    },

    // watch tasks for us
    watch: {
        sass: function() {
            gulp.watch(config.sass.src, ['buildSass']);
        },
        html: function() {
            gulp.watch(config.templates.src, ['buildHtml']);
        },
        js: function() {
            gulp.watch(config.js.src, ['buildJs'])
        },
        server: function() {
            nodemon({
                script: 'server.js',
                ext: 'html js ejs',
                env: {
                    'NODE_ENV': 'development'
                },
                ignore: ['node_modules/**/*.*', 'dist/**/*.*', 'assets/**/*.*', 'gulpConfig.js', 'gulpfile.js'],
                nodeArgs: ['--debug']
            });
        },
        reload: function() {
            gulp.watch('./dist/**/*.*').on('change', livereload.changed);
        },
        images: function() {
            gulp.watch(config.images.src, ['buildImgs']);
        }
    }
};

//lint JS assets only
var deps = prod ? ['clean'] : [];
var lint = prod ? [] : ['lint'];

gulp.task('lint', tasks.lint);
gulp.task('clean', tasks.clean);
gulp.task('buildSass', deps, tasks.buildSass);
gulp.task("buildJs", deps.concat(lint), tasks.buildJs);
gulp.task('buildHtml', deps, tasks.buildHtml);
gulp.task('vendorCss', deps, tasks.vendorCss);
gulp.task('vendorJs', deps, tasks.vendorJs);
gulp.task('buildImgs', deps, tasks.buildImgs);

//main build
var build = [
    'vendorCss',
    'vendorJs',
    'buildJs',
    'buildSass',
    'buildHtml',
    'buildImgs'
];

// dev build
gulp.task('watch', function() {
    livereload.listen();

    tasks.buildImgs();
    tasks.vendorJs();
    tasks.vendorCss();
    tasks.buildHtml();
    tasks.buildJs();
    tasks.buildSass();

    _.each(tasks.watch, function(watch) {
        watch();
    });

});
gulp.task("build", build);
