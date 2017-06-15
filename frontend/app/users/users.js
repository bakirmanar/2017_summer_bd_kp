app.controller('usersPageController', function ($scope, $rootScope, $state, authService, usersService, positionsService, Notification) {
  if(!authService.hasRole('ADMIN')){
    $state.go('selling');
  }

  $rootScope.currentPage = "Сотрудники";
  $scope.resetNewUser = function () {
    $scope.newUser = {
      name: ""
    }
  };
  $scope.resetNewUser();
  $scope.isDataLoaded = false;
  $scope.users = [];
  $scope.positions = [];
  $scope.roles = [];

  usersService.getUsers().then(function (response) {
    $scope.users = response.data;
    $scope.isDataLoaded = true;
  });
  usersService.getRoles().then(function (response) {
    $scope.roles = response.data;
    $scope.isDataLoaded = true;
  });
  positionsService.getPositions().then(function (response) {
    $scope.positions = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveUser = function (data) {
    return usersService.postUser(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteUser = function (id) {
    return usersService.deleteUser(id).then(function (response) {
      var index = findUserById(id);
      if (index !== -1) {
        $scope.users.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewUser = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13 ) {
      usersService.postUser($scope.newUser).then(function (response) {
        console.log(response);
        $scope.users.push(response.data.body);
        $scope.resetNewUser();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findUserById(id) {
    var index = -1;
    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});