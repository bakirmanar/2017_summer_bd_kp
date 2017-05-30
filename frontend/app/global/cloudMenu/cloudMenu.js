app.directive('cloudMenu', ['userService', '$uibModal', '$state', function (userService, $uibModal, $state) {
    return {
        restrict: 'E',
        templateUrl: "app/global/cloudMenu/cloudMenu.html",
        scope : {

        },
        controller: function($scope){
            $scope.currentUser = userService.currentUser;

            $scope.$watch(userService.watchCurrentUser, function(n){
                $scope.currentUser = n;
            });

            /**
             * @returns {boolean}
             */
            $scope.isUserLogged = function(){
                return $scope.currentUser != null;
            };


            $scope.logout = function(){
                //TODO temp
                $scope.currentUser = null;
            };

            $scope.openSignIn = function () {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/global/signInModal/sign-in-modal.html',
                    controller: 'signInModalController',
                    windowTopClass: 'login-modal'
                });

                modalInstance.result.then(function (model) {
                    if(model){
                        $state.go("main");
                    }
                });
            };

            $scope.go = function(state){
                $state.go(state);
            }
        }
    }
}]);