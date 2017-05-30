app.config(['$stateProvider', '$urlRouterProvider', function config($stateProvider,  $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'app/main/main.html',
                    controller: 'mainPageController'
                }
            },
            data: {
                bodyClasses: 'default'
            }
        })
        .state('account', {
            url: '/account',
            views: {
                '': {
                    templateUrl: 'app/account/account.html',
                    controller: 'accountPageController'
                }
            }
        })
        .state('auction', {
            url: '/auction/:ideaId',
            views: {
                '': {
                    templateUrl: 'app/auction/auction.html',
                    controller: 'auctionPageController'
                }
            }
        });
}]);