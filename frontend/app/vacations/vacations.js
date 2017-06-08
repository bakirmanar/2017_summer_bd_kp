app.controller('vacationsPageController', function ($scope, $filter,  vacationsService, usersService, Notification, $rootScope) {
  $rootScope.currentPage = "График отпусков";
  $scope.resetNewVacation = function () {
    $scope.newVacation = {

    }
  };
  $scope.resetNewVacation();
  $scope.isDataLoaded = false;
  $scope.vacations = [];
  $scope.users = [];

  vacationsService.getVacations().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date_from = new Date(item.date_from);
      item.date_to = new Date(item.date_to);
    });
    $scope.vacations = response.data;
  });

  usersService.getUsers().then(function (response) {
    $scope.users = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveVacation = function (data) {
    return vacationsService.postVacation(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteVacation = function (id) {
    return vacationsService.deleteVacation(id).then(function (response) {
      var index = findVacationById(id);
      if (index !== -1) {
        $scope.vacations.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewVacation = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newVacation.date_from = $filter('date')($scope.newVacation.date_from, 'yyyy-MM-dd');
      $scope.newVacation.date_to = $filter('date')($scope.newVacation.date_to, 'yyyy-MM-dd');

      vacationsService.postVacation($scope.newVacation).then(function (response) {
        response.data.body.date_from = new Date(response.data.body.date_from);
        response.data.body.date_to = new Date(response.data.body.date_to);
        $scope.vacations.push(response.data.body);
        $scope.resetNewVacation();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findVacationById(id) {
    var index = -1;
    for (var i = 0; i < $scope.vacations.length; i++) {
      if ($scope.vacations[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});