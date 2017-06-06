app.config(['$stateProvider', '$urlRouterProvider', function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('account', {
      url: '/account',
      views: {
        '': {
          templateUrl: 'app/account/account.html',
          controller: 'accountPageController'
        }
      }
    })
    .state('products', {
      url: '/products',
      views: {
        '': {
          templateUrl: 'app/products/products.html',
          controller: 'productsPageController'
        }
      }
    })
    .state('categories', {
      url: '/categories',
      views: {
        '': {
          templateUrl: 'app/categories/categories.html',
          controller: 'categoriesPageController'
        }
      }
    })
    .state('producers', {
      url: '/producers',
      views: {
        '': {
          templateUrl: 'app/producers/producers.html',
          controller: 'producersPageController'
        }
      }
    })
    .state('providers', {
      url: '/providers',
      views: {
        '': {
          templateUrl: 'app/providers/providers.html',
          controller: 'providersPageController'
        }
      }
    })
    .state('storages', {
      url: '/storages',
      views: {
        '': {
          templateUrl: 'app/storages/storages.html',
          controller: 'storagesPageController'
        }
      }
    })
    .state('positions', {
      url: '/positions',
      views: {
        '': {
          templateUrl: 'app/positions/positions.html',
          controller: 'positionsPageController'
        }
      }
    })
    .state('users', {
      url: '/users',
      views: {
        '': {
          templateUrl: 'app/users/users.html',
          controller: 'usersPageController'
        }
      }
    })
}]);