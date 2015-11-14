var gulp = require("gulp");
var R = require('ramda');
var _ = require('lodash');
var sass = require('gulp-sass');
var gutil = require("gulp-util");
var webpack = require("webpack");
var config = require('./gulpConfig')(webpack);
var concatCss = require('gulp-concat-css');
var del = require('del');
var minifyHtml = require('gulp-minify-html');

// determine if we are in a production build
var env = process.env.NODE_ENV || '';
var prod = (env === 'production' || false);

var tasks = {
    // cleaning up the dist folder more than likely
    clean : function() {
        del(config.clean)
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
        }
    }
};

gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

var deps = prod ? ['clean'] : [];
gulp.task('clean', tasks.clean);
gulp.task('buildSass', deps, tasks.buildSass);
gulp.task("buildJs", deps, tasks.buildJs);
gulp.task('buildHtml', deps, tasks.buildHtml);

//main build
var build = [
    'buildJs',
    'buildSass',
    'buildHtml'
];

gulp.task('watch', function() {
    _.each(tasks.watch, function(watch) {
        watch();
    });
});
gulp.task("build", build);
