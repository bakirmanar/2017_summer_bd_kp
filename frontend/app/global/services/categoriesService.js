app.service('categoriesService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getCategories = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/categories"
        })
    };

    this.postCategory = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/category",
            data: data
        })
    };

    this.deleteCategory = function(data){
        return $http({
            method: "delete",
            url: apiUrl + "api/category/" + data.id
        })
    };
}]);
