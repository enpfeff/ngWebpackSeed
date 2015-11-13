/**
 * Created by ianpfeffer on 8/20/15.
 */

var _ = require('lodash');
var glob = require('glob');

module.exports = _.extend(
    require('./environment/all'),
    require('./environment/' + process.env.NODE_ENV) || {}
);

module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
    var that = this;
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    var output = [];

    if (_.isArray(globPatterns)) {
        _.forEach(globPatterns, function(pattern) {
            //recusively go grab all the files
            output = _.union(output, that.getGlobbedFiles(pattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            //its a URL good enough
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (files.length) {
                if (removeRoot) {
                    var removedRoot = [];
                    _.forEach(files, function(file) {
                        removedRoot.push(path.basename(file.toString()));
                    });
                    output = output.concat(removedRoot);
                } else {
                    output = _.union(output, files);
                }
            }
        }
    }
    return output;
};