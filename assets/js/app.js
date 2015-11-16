/**
 * Created by ianpfeffer on 8/20/15.
 */
var $ = require('jquery');
var config = require('./config');
require('angular-ui-router');
require('angular-material');

var requires = [
    require('./core').name,
    require('./auth').name,
    'ui.router',
    'ngMaterial'
];

// The main app
var app = angular.module(config.app.name, requires);

angular.element(document).ready(function() {
    angular.bootstrap(document, [config.app.name]);
});

module.exports = app = window.app;