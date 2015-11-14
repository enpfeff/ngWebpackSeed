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
                new webpack.ResolverPlugin(
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                )
            ],
            entry: './assets/js/app.js',
            output: {
                path: dist,
                filename: 'bundle.js'
            },
            module: {
                loaders: [
                    // "test" should be a regular expression that is run
                    // against the path
                    // "loader" tells webpack what loaders should be applied
                    { test: /[\/]angular\.js$/, loader: "exports?angular" }
                ]
            }
        },

        sass: {
            src: './assets/sass/**/*.scss',
            dist: dist + '/css'
        },
        clean: [dist],
        templates: {
            src: './assets/templates/**/*.html',
            dist: dist + '/templates',
            minify: {
                conditionals: true,
                spare:true
            }
        },
        js: {
            // used for development watch
            src: './assets/js/**/*.js'
        }

    }
};