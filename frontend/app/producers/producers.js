app.controller('producersPageController', function ($scope, producersService, Notification, $rootScope) {
  $rootScope.currentPage = "Производители";
  $scope.resetNewProducer = function () {
    $scope.newProducer = {
      name: ""
    }
  };
  $scope.resetNewProducer();
  $scope.isDataLoaded = false;
  $scope.producers = [];

  producersService.getProducers().then(function (response) {
    $scope.producers = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveProducer = function (data) {
    return producersService.postProducer(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteProducer = function (id) {
    return producersService.deleteProducer(id).then(function (response) {
      var index = findProducerById(id);
      if (index !== -1) {
        $scope.producers.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewProducer = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      producersService.postProducer($scope.newProducer).then(function (response) {
        console.log(response);
        $scope.producers.push(response.data.body);
        $scope.resetNewProducer();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findProducerById(id) {
    var index = -1;
    for (var i = 0; i < $scope.producers.length; i++) {
      if ($scope.producers[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});