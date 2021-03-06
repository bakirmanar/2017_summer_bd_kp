app.controller('positionsPageController', function ($scope, $state, authService, positionsService, Notification, $rootScope) {
  if(!authService.hasRole('ADMIN')){
    $state.go('selling');
  }

  $rootScope.currentPage = "Должности";
  $scope.resetNewPosition = function () {
    $scope.newPosition = {
      name: ""
    }
  };
  $scope.resetNewPosition();
  $scope.isDataLoaded = false;
  $scope.positions = [];

  positionsService.getPositions().then(function (response) {
    $scope.positions = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.savePosition = function (data) {
    return positionsService.postPosition(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deletePosition = function (id) {
    return positionsService.deletePosition(id).then(function (response) {
      var index = findPositionById(id);
      if (index !== -1) {
        $scope.positions.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewPosition = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      positionsService.postPosition($scope.newPosition).then(function (response) {
        console.log(response);
        $scope.positions.push(response.data.body);
        $scope.resetNewPosition();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findPositionById(id) {
    var index = -1;
    for (var i = 0; i < $scope.positions.length; i++) {
      if ($scope.positions[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});