app.service('productsService', ['apiUrl', '$http', function (apiUrl, $http) {

  var that = this;

  this.getProducts = function(){
    return $http({
      method: "get",
      url: apiUrl + "api/products"
    })
  };

  this.postProduct = function(data){
    return $http({
      method: "post",
      url: apiUrl + "api/product",
      data: data
    })
  };

  this.deleteProduct = function(id){
    return $http({
      method: "delete",
      url: apiUrl + "api/product/" + id
    })
  };
}]);
