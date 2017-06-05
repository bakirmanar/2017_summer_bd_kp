app.controller('productsPageController', function ($scope, $rootScope, productsService, categoriesService, producersService, providersService, Notification) {
  $rootScope.currentPage = "Товары";
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

  producersService.getProducers().then(function (response) {
    $scope.producers = response.data;
  });

  providersService.getProviders().then(function (response) {
    $scope.providers = response.data;
  });

  $scope.saveProduct = function (data) {
    productsService.postProduct(data).then(function (response) {
      Notification.success("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewProduct = function ($event) {
    if ($event.keyCode === 13) {
      productsService.postProduct($scope.newProduct).then(function (response) {
        $scope.products.push(response.data.body);
        $scope.resetNewProduct();
        Notification.success("Изменения сохранены");
      }, function (response) {
        console.log(response);
        Notification.error(response.data.error);
      });
    }
  };

  $scope.deleteProduct = function (id) {
    return productsService.deleteProduct(id).then(function (response) {
      var index = findProductById(id);
      if (index !== -1) {
        $scope.products.splice(index, 1);
      }
      Notification.success("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
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
});