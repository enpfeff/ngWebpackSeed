/**
 * Created by ianpfeffer on 8/20/15.
 */
var config = require('../../config/config');

// give the index page
exports.index = function(req, res) {
    res.render('index', {
        title: config.app.title
    });
};