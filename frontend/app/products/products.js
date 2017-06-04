app.controller('productsPageController', ['$scope', 'productsService', 'categoriesService',
  function ($scope, productsService, categoriesService) {

    $scope.isDataLoaded = false;
    $scope.resetNewProduct = function () {
      $scope.newProduct = {
        name: ""
      }
    };
    $scope.resetNewProduct();

    productsService.getProducts().then(function (response) {
      $scope.products = response.data;
      $scope.isDataLoaded = true;
    });

    categoriesService.getCategories().then(function (response) {
      $scope.categories = response.data;
    });

    $scope.saveProduct = function (data) {
      productsService.postProduct(data);
    };

    $scope.saveNewProduct = function ($event) {
      if ($event.keyCode === 13) {
        productsService.postProduct($scope.newProduct).then(function (response) {
          $scope.products.push(response.data.body);
          $scope.resetNewProduct();
        });
      }
    };

    $scope.deleteProduct = function (id) {
      return productsService.deleteProduct(id).then(function (response) {
        var index = findProductById(id);
        if (index !== -1) {
          $scope.products.splice(index, 1);
        }
      });
    };

    function findProductById(id) {
      var index = -1;
      for (var i = 0; i < $scope.products.length; i++) {
        if ($scope.products[i].id === id) {
          index = i;
        }
      }
      return index;
    }
  }]);