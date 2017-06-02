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

    $scope.deleteCategory = function (data) {
        return categoriesService.deleteCategory(data).then(function (response) {
            var id = findCategoryById(data.id);
            if(id !== -1){
                $scope.categories.splice(id, 1);
            }
        });
    };

    $scope.postNewCategory = function ($event) {
        if($event.keyCode === 13) {
            categoriesService.postCategory($scope.newCategory).then(function (response) {
                console.log(response);
                $scope.categories.push(response.data.body);
                $scope.resetNewCategory();
            });
        }
    };

    function findCategoryById (id) {
        var index = -1;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].id === id){
                index = i;
            }
        }
        return index;
    }
}]);