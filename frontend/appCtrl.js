app.controller('appController',  function($scope, $state, $rootScope, authService){
  $rootScope.currentPage = "";
  authService.getCurrentUser().then(function (response) {
    if(!response){
      $state.go("login");
    }
  });
});