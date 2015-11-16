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

    // login state
    var login = {
        url: '/login',
        views: {
            'main' : {
                templateUrl: 'templates/auth/login.html',
                controller: 'LoginCtrl as vm'
            }
        }
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
        data: {
            roles: ['User']
        },
        resolve: {
            Authorize: ['Authorization',
                function(Authorization) {
                    return Authorization.authorize();
                }
            ]
        }
    };

    // add the state info to the stateProvider
    $stateProvider
        .state('what', what)
        .state('what.login', login)
        .state('what.dashboard', dashboard);

}];

module.exports = config;