app.controller('loginPageController', function ($scope, $state, authService, Notification, $rootScope) {
  $rootScope.currentPage = "Авторизация";

  if(authService.isLoggedIn()){
    $state.go("selling");
  }

  $scope.creds = {
    username: "",
    password: ""
  };

  $scope.login = function () {
    authService.login($scope.creds);
  }
});