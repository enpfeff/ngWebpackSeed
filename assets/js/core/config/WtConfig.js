var config = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // set default pge
    $urlRouterProvider.otherwise('/');

    //parent state of the app
    var what = {
        url: "/what",
        abstract: true,
        controller: 'ApplicationController as appCtrl',
        templateUrl: 'templates/what.html',
        resolve: {}
    };

    var dashboard = {
        //dashboard parent controller
        url: '/dashboard',
        views: {
            'main': {
                templateUrl: 'templates/dashboard/dashboard.html',
                controller: 'DashboardMainController as dashMainCtrl'
            }
        },

        resolve:{}
    };



    $stateProvider
        .state('what', what)
        .state('what.dashboard', dashboard)

}];

module.exports = config;