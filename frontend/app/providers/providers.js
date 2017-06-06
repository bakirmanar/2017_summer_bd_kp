app.controller('providersPageController', function ($scope, $rootScope, providersService, Notification) {
  $rootScope.currentPage = "Поставщики";
  $scope.resetNewProvider = function () {
    $scope.newProvider = {
      name: ""
    }
  };
  $scope.resetNewProvider();
  $scope.isDataLoaded = false;
  $scope.providers = [];

  providersService.getProviders().then(function (response) {
    $scope.providers = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveProvider = function (data) {
    return providersService.postProvider(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteProvider = function (id) {
    return providersService.deleteProvider(id).then(function (response) {
      var index = findProviderById(id);
      if (index !== -1) {
        $scope.providers.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewProvider = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      providersService.postProvider($scope.newProvider).then(function (response) {
        console.log(response);
        $scope.providers.push(response.data.body);
        $scope.resetNewProvider();
        Notification.success("Новая запсь сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findProviderById(id) {
    var index = -1;
    for (var i = 0; i < $scope.providers.length; i++) {
      if ($scope.providers[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});