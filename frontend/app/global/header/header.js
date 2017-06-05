app.directive('topHeader',  function () {
    return {
        restrict: 'E',
        templateUrl: "app/global/header/header.html",
        scope : {

        },
        controller: function($scope, $rootScope, $state){
            $scope.$watch(function () {
              return $rootScope.currentPage
            }, function (n, o) {
                if (n !== o){
                  $scope.currentPage = n;
                }
            });

            $scope.go = function(state){
                $state.go(state);
            }
        }
    }
});