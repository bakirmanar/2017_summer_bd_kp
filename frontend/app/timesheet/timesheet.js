app.controller('timesheetPageController', function ($scope, $filter, $state, authService, timesheetService, usersService, Notification, $rootScope) {
  if(!authService.hasRole('ADMIN') || !authService.hasRole('MANAGER')){
    $state.go('selling');
  }

  $rootScope.currentPage = "Табель учета";
  $scope.resetNewTimesheet = function () {
    $scope.newTimesheet = {

    }
  };
  $scope.resetNewTimesheet();
  $scope.isDataLoaded = false;
  $scope.timesheet = [];
  $scope.users = [];

  timesheetService.getTimesheet().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date = new Date(item.date);
    });
    $scope.timesheet = response.data;
  });

  usersService.getUsers().then(function (response) {
    $scope.users = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveTimesheet = function (data) {
    return timesheetService.postTimesheet(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteTimesheet = function (id) {
    return timesheetService.deleteTimesheet(id).then(function (response) {
      var index = findTimesheetById(id);
      if (index !== -1) {
        $scope.timesheet.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewTimesheet = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newTimesheet.date = $filter('date')($scope.newTimesheet.date, 'yyyy-MM-dd');
      timesheetService.postTimesheet($scope.newTimesheet).then(function (response) {
        response.data.body.date = new Date(response.data.body.date);
        $scope.timesheet.push(response.data.body);
        $scope.resetNewTimesheet();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findTimesheetById(id) {
    var index = -1;
    for (var i = 0; i < $scope.timesheet.length; i++) {
      if ($scope.timesheet[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});