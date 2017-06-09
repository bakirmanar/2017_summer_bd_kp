app.controller('gettingPageController', function ($scope, $filter, gettingService, storagesService, productsService, Notification, $rootScope) {
  $rootScope.currentPage = "Пополнение товара";
  $scope.resetNewGetting = function () {
    $scope.newGetting = {
      date: new Date()
    }
  };
  $scope.resetNewGetting();
  $scope.isDataLoaded = false;
  $scope.gettings = [];
  $scope.storages = [];
  $scope.products = [];
  $scope.types = ["Наличный", "Безналичный", "Льгота"];

  gettingService.getGetting().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date = new Date(item.date);
    });
    $scope.gettings = response.data;
  });

  storagesService.getStorages().then(function (response) {
    $scope.storages = response.data;
    $scope.isDataLoaded = true;
  });

  productsService.getProducts().then(function (response) {
    $scope.products = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveGetting = function (data) {
    return gettingService.postGetting(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteGetting = function (id) {
    return gettingService.deleteGetting(id).then(function (response) {
      var index = findGettingById(id);
      if (index !== -1) {
        $scope.gettings.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewGetting = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newGetting.date = $filter('date')($scope.newGetting.date, 'yyyy-MM-dd');


      gettingService.postGetting($scope.newGetting).then(function (response) {
        response.data.body.date = new Date(response.data.body.date);
        $scope.gettings.push(response.data.body);
        $scope.resetNewGetting();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findGettingById(id) {
    var index = -1;
    for (var i = 0; i < $scope.gettings.length; i++) {
      if ($scope.gettings[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});