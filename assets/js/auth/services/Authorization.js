/**
 * Created by ianpfeffer on 11/13/15.
 * Copyright Netscout 2015
 */
var service = ['$rootScope', '$state', 'User', function($rootScope, $state, User) {
    var that = this;

    this.authorize = function() {
        return User.identity().then(function(res) {
            var isAuthenticated = User.isAuthenticated();

            if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !User.isInAnyRole($rootScope.toState.data.roles)) {
                if (isAuthenticated) $state.go('accessdenied'); // user is signed in but not authorized for desired state
                else {
                    // user is not authenticated. stow the state they wanted before you
                    // send them to the signin state, so you can return them when you're done
                    $rootScope.returnToState = $rootScope.toState;
                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                    // now, send them to the signin state so they can log in
                    $state.go('what.login');
                }
            }

        })
    }
}];

module.exports = service;