app.controller('storagesPageController', function ($scope, $rootScope, $state, authService, storagesService, Notification) {
  if(!authService.hasRole('ADMIN') || !authService.hasRole('MANAGER')){
    $state.go('selling');
  }

  $rootScope.currentPage = "Склады";
  $scope.resetNewStorage = function () {
    $scope.newStorage = {
      name: ""
    }
  };
  $scope.resetNewStorage();
  $scope.isDataLoaded = false;
  $scope.storages = [];

  storagesService.getStorages().then(function (response) {
    $scope.storages = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveStorage = function (data) {
    return storagesService.postStorage(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteStorage = function (id) {
    return storagesService.deleteStorage(id).then(function (response) {
      var index = findStorageById(id);
      if (index !== -1) {
        $scope.storages.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewStorage = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      storagesService.postStorage($scope.newStorage).then(function (response) {
        console.log(response);
        $scope.storages.push(response.data.body);
        $scope.resetNewStorage();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findStorageById(id) {
    var index = -1;
    for (var i = 0; i < $scope.storages.length; i++) {
      if ($scope.storages[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});