/**
 * Created by ianpfeffer on 8/20/15.
 */
var $ = require('jquery');
var angular = require('angular');
var config = require('./config');
var uiRouter = require('angular-ui-router');

var requires = [
    require('./core').name,
    'ui.router'
];

// The main app
var app = angular.module(config.app.name, requires);

angular.element(document).ready(function() {
    angular.bootstrap(document, [config.app.name]);
});

module.exports = app = window.app;