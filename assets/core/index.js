/**
 * Created by ianpfeffer on 8/20/15.
 */
var angular = require('angular');
var config = require('../config');

var app = angular.module(config.app.name + 'core', []);

//controllers
app.controller('MainController', require('./controllers/MainController'));

//services

//factorys

//config


module.exports = app;