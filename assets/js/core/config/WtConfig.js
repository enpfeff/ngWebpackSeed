var config = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // set default pge
    $urlRouterProvider.otherwise('/what/dashboard');

    //parent state of the app
    var what = {
        url: "/what",
        abstract: true,
        controller: 'AppCtrl as app',
        templateUrl: 'templates/what.html',
        resolve: {}
    };

    // main view
    var dashboard = {
        //dashboard parent controller
        url: '/dashboard',
        views: {
            'main': {
                templateUrl: 'templates/dashboard/dashboard.html',
                controller: 'MainCtrl as vm'
            }
        },
        resolve:{}
    };

    // add the state info to the stateProvider
    $stateProvider
        .state('what', what)
        .state('what.dashboard', dashboard);

}];

module.exports = config;