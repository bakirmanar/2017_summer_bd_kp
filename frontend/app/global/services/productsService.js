app.service('productsService', ['apiUrl', '$http', function (apiUrl, $http) {

  var that = this;

  this.getProducts = function(){
    return $http({
      method: "get",
      url: apiUrl + "api/products"
    })
  };

  this.postProducts = function(product){
    return $http({
      method: "post",
      url: apiUrl + "api/products",
      body: product
    })
  };

}]);