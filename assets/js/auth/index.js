/**
 * Created by ianpfeffer on 11/13/15.
 * Copyright Netscout 2015
 */
/**
 * Created by ianpfeffer on 8/20/15.
 */
var angular = require('angular');
var config = require('../config');

var app = angular.module(config.app.name + 'auth', ['ui.router']);

app.service('User', require('./services/User'));
app.service('Authorization', require('./services/Authorization'));

app.controller('LoginCtrl', require('./controllers/LoginController'));

app.run(require('./config/StateConfig'));

module.exports = app;