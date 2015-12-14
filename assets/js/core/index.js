/**
 * Created by ian on 12/14/15.
 */
import angular from 'angular'
import AppController from './controllers/AppController'
import routing from './routes';

import uiRouter from 'angular-ui-router';

//define the module
let core = angular.module('core', [uiRouter]);

//add things to the module
core.controller('AppController', AppController);
core.config(routing);

//export the default value, only want to export one thing
export default core;