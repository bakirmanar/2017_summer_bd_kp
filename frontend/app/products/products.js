app.controller('productsPageController', ['productsService', '$scope', function (productsService, $scope) {

  $scope.isDataLoaded = false;

  productsService.getProducts().then(function (response) {
    $scope.products = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.createNewProduct = function () {
    var body = {
      name: "benalgin",
      count: 6
    };
    productsService.postProducts(body).then(function (response) {

    });
  }
}]);