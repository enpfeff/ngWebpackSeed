/**
 * Created by ianpfeffer on 11/13/15.
 * Copyright Netscout 2015
 */
module.exports = function(app) {
    var controller = require('../controllers/login.controller');

    // send data to the api to get JWT
    app.route('/login').get(controller.login);
};
