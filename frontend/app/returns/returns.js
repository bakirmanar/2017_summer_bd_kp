app.controller('returnsPageController', function ($scope, $filter, returnsService, c_notesService, productsService, Notification, $rootScope) {
  $rootScope.currentPage = "Возвращение товара";
  $scope.resetNewReturn = function () {
    $scope.newReturn = {
      date: new Date()
    }
  };
  $scope.resetNewReturn();
  $scope.isDataLoaded = false;
  $scope.returns = [];
  $scope.c_notes = [];
  $scope.products = [];

  returnsService.getReturns().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date = new Date(item.date);
    });
    $scope.returns = response.data;
  });

  c_notesService.getC_notes().then(function (response) {
    $scope.c_notes = response.data;
    $scope.isDataLoaded = true;
  });

  productsService.getProducts().then(function (response) {
    $scope.products = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveReturn = function (data) {
    return returnsService.postReturn(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteReturn = function (id) {
    return returnsService.deleteReturn(id).then(function (response) {
      var index = findReturnById(id);
      if (index !== -1) {
        $scope.returns.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewReturn = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newReturn.date = $filter('date')($scope.newReturn.date, 'yyyy-MM-dd');

      returnsService.postReturn($scope.newReturn).then(function (response) {
        response.data.body.date = new Date(response.data.body.date);
        $scope.returns.push(response.data.body);
        $scope.resetNewReturn();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findReturnById(id) {
    var index = -1;
    for (var i = 0; i < $scope.returns.length; i++) {
      if ($scope.returns[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});