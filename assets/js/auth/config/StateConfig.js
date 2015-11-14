/**
 * Created by ianpfeffer on 11/13/15.
 * Copyright Netscout 2015
 */
var run = ['$rootScope', '$state', '$stateParams', 'Authorization', 'User',
    function($rootScope, $state, $stateParams, Authorization, User) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            // track the state the user wants to go to; Authorization service needs this
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
            if (User.isIdentityResolved()) Authorization.authorize();
        });

    }
];

module.exports = run;