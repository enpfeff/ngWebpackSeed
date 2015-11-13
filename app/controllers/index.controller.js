/**
 * Created by ianpfeffer on 8/20/15.
 */
var config = require('../../config/config');

exports.index = function(req, res) {
    res.render('index', {
        title: config.app.title
    });
};