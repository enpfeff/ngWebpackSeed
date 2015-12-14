/**
 * Created by ian on 12/14/15.
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    console.log('things');

    $stateProvider.state('app', {
        url: '/',
        template: require('./templates/home.html'),
        controller: 'AppController',
        controllerAs: 'app'
    })
};