app.controller('sellingPageController', function ($scope, $filter, sellingService, usersService, productsService, Notification, $rootScope) {
  $rootScope.currentPage = "Продажи";
  $scope.resetNewSelling = function () {
    $scope.newSelling = {
      date: new Date()
    }
  };
  $scope.resetNewSelling();
  $scope.isDataLoaded = false;
  $scope.sellings = [];
  $scope.users = [];
  $scope.products = [];
  $scope.types = ["Наличный", "Безналичный", "Льгота"];

  sellingService.getSelling().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date = new Date(item.date);
    });
    $scope.sellings = response.data;
  });

  usersService.getUsers().then(function (response) {
    $scope.users = response.data;
    $scope.isDataLoaded = true;
  });

  productsService.getProducts().then(function (response) {
    $scope.products = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveSelling = function (data) {
    return sellingService.postSelling(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteSelling = function (id) {
    return sellingService.deleteSelling(id).then(function (response) {
      var index = findSellingById(id);
      if (index !== -1) {
        $scope.sellings.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewSelling = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newSelling.date = $filter('date')($scope.newSelling.date, 'yyyy-MM-dd');


      sellingService.postSelling($scope.newSelling).then(function (response) {
        response.data.body.date = new Date(response.data.body.date);
        $scope.sellings.push(response.data.body);
        $scope.resetNewSelling();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findSellingById(id) {
    var index = -1;
    for (var i = 0; i < $scope.sellings.length; i++) {
      if ($scope.sellings[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});