app.controller('categoriesPageController', ['categoriesService', '$scope', function (categoriesService, $scope) {
    $scope.resetNewCategory = function () {
        $scope.newCategory = {
            name: ""
        }
    };
    $scope.resetNewCategory();
    $scope.isDataLoaded = false;
    $scope.categories =[];

    categoriesService.getCategories().then(function (response) {
        $scope.categories = response.data;
        $scope.isDataLoaded = true;
    });

    $scope.postCategory = function (data) {
        return categoriesService.postCategory(data);
    };

    $scope.postNewCategory = function ($event) {
        if($event.keyCode === 13) {
            categoriesService.postCategory($scope.newCategory).then(function (response) {
                console.log(response);
                $scope.categories.push(response.data);
                $scope.resetNewCategory();
            });
        }
    };
}]);