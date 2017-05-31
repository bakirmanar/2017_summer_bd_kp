app.controller('productsPageController',['productsService', '$scope', function(productsService, $scope){

    $scope.isDataLoaded = false;

    productsService.getProducts().then(function(response){
        $scope.products = response.data;
        $scope.isDataLoaded = true;
    });
}]);