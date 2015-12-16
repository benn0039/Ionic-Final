angular.module('final')


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html',
                    controller: 'searchCtrl'
                }
            }
        })

        .state('app.store', {
            url: '/store',
            views: {
                'menuContent': {
                    templateUrl: 'templates/store.html',
                    controller: 'storeCtrl'
                }
            }
        })

        .state('app.logs', {
            url: '/logs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/logs.html',
                    controller: 'logCtrl',
                }
            }
        })


        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
