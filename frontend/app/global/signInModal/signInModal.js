app.controller("signInModalController", ['$scope', '$uibModalInstance', 'userService', function($scope, $uibModalInstance, userService){

    $scope.signIn = function(){
        userService.login($scope.userName, $scope.password).then(function(){
            $uibModalInstance.close(true);
        });
    }

}]);