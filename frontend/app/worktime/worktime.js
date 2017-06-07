app.controller('worktimePageController', function ($scope, worktimesService, usersService, Notification, $rootScope) {
  $rootScope.currentPage = "График сменности";
  $scope.resetNewWorktime = function () {
    $scope.newWorktime = {

    }
  };
  $scope.resetNewWorktime();
  $scope.isDataLoaded = false;
  $scope.worktimes = [];
  $scope.users = [];
  $scope.workSchedules = ["5/2","2/2"];
  $scope.workHours = [2, 4, 6, 8, 10, 12];
  $scope.workShifts = [1, 2, 3];

  worktimesService.getWorktimes().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date_from = new Date(item.date_from);
      item.date_to = new Date(item.date_to);
    });
    $scope.worktimes = response.data;
  });

  usersService.getUsers().then(function (response) {
    $scope.users = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveWorktime = function (data) {
    return worktimesService.postWorktime(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteWorktime = function (id) {
    return worktimesService.deleteWorktime(id).then(function (response) {
      var index = findWorktimeById(id);
      if (index !== -1) {
        $scope.worktimes.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewWorktime = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      worktimesService.postWorktime($scope.newWorktime).then(function (response) {
        console.log(response);
        $scope.worktimes.push(response.data.body);
        $scope.resetNewWorktime();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findWorktimeById(id) {
    var index = -1;
    for (var i = 0; i < $scope.worktimes.length; i++) {
      if ($scope.worktimes[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});