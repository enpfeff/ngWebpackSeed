/**
 * Created by ianpfeffer on 11/13/15.
 */
var service = ['$http', '$q', function($http, $q) {
    var that = this;
    var _identity = undefined;
    var _authenticated = false;


    this.isIdentityResolved = function() {
        return angular.isDefined(_identity);
    };

    this.isAuthenticated = function() {
        return _authenticated;
    };

    this.isInRole = function(role) {
        if (!_authenticated || !_identity.roles) return false;

        return _identity.roles.indexOf(role) != -1;
    };

    this.isInAnyRole = function(roles) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i = 0; i < roles.length; i++) {
            if (this.isInRole(roles[i])) return true;
        }

        return false;
    };

    this.authenticate = function(identity) {
        _identity = identity;
        _authenticated = identity != null;
    };

    this.identity = function(force) {
        var deferred = $q.defer();

        if (force === true) _identity = undefined;

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
            deferred.resolve(_identity);

            return deferred.promise;
        }

        // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
        //                   $http.get('/svc/account/identity', { ignoreErrors: true })
        //                        .success(function(data) {
        //                            _identity = data;
        //                            _authenticated = true;
        //                            deferred.resolve(_identity);
        //                        })
        //                        .error(function () {
        //                            _identity = null;
        //                            _authenticated = false;
        //                            deferred.resolve(_identity);
        //                        });

        var self = this;
        $timeout(function() {
            self.authenticate(null);
            deferred.resolve(_identity);
        }, 1000);

        return deferred.promise;
    }
}];

module.exports = service;
