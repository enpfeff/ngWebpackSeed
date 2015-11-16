/**
 * Created by ianpfeffer on 8/20/15.
 */
var config = require('../config');

var app = angular.module(config.app.name + 'core', ['ui.router']);

//controllers
app.controller('MainCtrl', require('./controllers/MainController'));
app.controller('AppCtrl', require('./controllers/AppController'));

//services

//factorys

//config
app.config(require('./config/WtConfig'));

module.exports = app;