app.config(['$stateProvider', '$urlRouterProvider', function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
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
    .state('worktime', {
      url: '/worktime',
      views: {
        '': {
          templateUrl: 'app/worktime/worktime.html',
          controller: 'worktimePageController'
        }
      }
    })
    .state('vacations', {
      url: '/vacations',
      views: {
        '': {
          templateUrl: 'app/vacations/vacations.html',
          controller: 'vacationsPageController'
        }
      }
    })
    .state('timesheet', {
      url: '/timesheet',
      views: {
        '': {
          templateUrl: 'app/timesheet/timesheet.html',
          controller: 'timesheetPageController'
        }
      }
    })
    .state('selling', {
    url: '/selling',
    views: {
      '': {
        templateUrl: 'app/selling/selling.html',
        controller: 'sellingPageController'
      }
    }
  })
  .state('getting', {
    url: '/getting',
    views: {
      '': {
        templateUrl: 'app/getting/getting.html',
        controller: 'gettingPageController'
      }
    }
  })
  .state('returns', {
    url: '/returns',
    views: {
      '': {
        templateUrl: 'app/returns/returns.html',
        controller: 'returnsPageController'
      }
    }
  })
  .state('consignment_notes', {
    url: '/consignment_notes',
    views: {
      '': {
        templateUrl: 'app/c_notes/c_notes.html',
        controller: 'c_notesPageController'
      }
    }
  })
  .state('booking', {
    url: '/booking',
    views: {
      '': {
        templateUrl: 'app/booking/booking.html',
        controller: 'bookingPageController'
      }
    }
  })
  .state('login', {
    url: '/login',
    views: {
      '': {
        templateUrl: 'app/login/login.html',
        controller: 'loginPageController'
      }
    }
  })
}]);