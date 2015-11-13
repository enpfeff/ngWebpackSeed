/**
 * Created by ianpfeffer on 8/20/15.
 */
module.exports = function(webpack){
    return {
        webpack : {
            resolve: {
                root: "./bower_components"
            },
            plugins: [
                new webpack.ResolverPlugin(
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                )
            ],
            entry: './assets/app.js',
            output: {
                path: "./dist",
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
        }

    }
};