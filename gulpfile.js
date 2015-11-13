var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var config = require('./gulpConfig')(webpack);

var tasks = {
    buildAssets : function() {
        webpack(config.webpack, function(err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }
            gutil.log("[webpack]", stats.toString({

            }));
        });
    }
};

gulp.task("buildAssets", tasks.buildAssets());

var build = [
    'buildAssets'
];

gulp.task("build", build);
