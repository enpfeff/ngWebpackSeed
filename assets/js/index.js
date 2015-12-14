import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import routing from './routes';
import config from './config';
import core from './core';

let requires = [
    angularUiRouter,
    core.name
];

let app = angular.module(config.app.name, requires);

angular.element(document).ready(() => {
    console.log('bootstrapping');
    angular.bootstrap(document,  [config.app.name])
});

app.config(routing);

export default app = window.app;

