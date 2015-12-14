/**
 * Created by ianpfeffer on 8/20/15.
 */
module.exports = function(webpack){
    var dist = './dist';

    return {
        dist: dist,
        webpack : {
            resolve: {
                root: "./bower_components"
            },
            plugins: [
                new webpack.ProvidePlugin({
                    jQuery: 'jquery',
                    $: 'jquery',
                    'window.jQuery': 'jquery'
                })
            ],
            entry: './assets/js/index.js',
            output: {
                path: dist,
                filename: 'bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        query: {
                            presets: ['es2015']
                        }
                    },
                    { test: /\.html/, loader: "html-loader" },
                ]
            }
        },

        sass: {
            src: './assets/sass/**/*.scss',
            dist: dist + '/css'
        },
        clean: [dist],
        templates: {
            src: './assets/**/*.html',
            dist: dist + '/templates',
            minify: {
                conditionals: true,
                spare:true
            }
        },
        js: {
            // used for development watch
            src: './assets/js/**/*.js'
        },
        images: {
            src: './assets/images/**/*.*',
            dist: dist + '/images'
        },
        vendor: {
            distCss: dist + '/vendor/css',
            css: [],
            distJs: dist + '/vendor/js',
            js : []
        }

    }
};