app.directive('topHeader',  function () {
    return {
        restrict: 'E',
        templateUrl: "app/global/header/header.html",
        scope : {

        },
        controller: function($scope, $rootScope, $state, authService){
            $scope.$watch(function () {
              return $rootScope.currentPage
            }, function (n, o) {
                if (n !== o){
                  $scope.currentPage = n;
                }
            });

          $scope.$watch(function () {
            return authService.currentUser
          }, function (n, o) {
            if (n !== o){
              $scope.currentUser = n.username;
            }
          });

            $scope.go = function(state){
                $state.go(state);
            };

          $scope.logout = function () {
            authService.logout()
          };

          $scope.isLoggedIn = function () {
            return authService.isLoggedIn();
          };

          $scope.hasRole = function (role) {
            return authService.hasRole(role);
          };
        }
    }
});