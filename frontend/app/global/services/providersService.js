app.service('providersService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getProviders = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/providers"
        })
    };

    this.postProvider = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/provider",
            data: data
        })
    };

    this.deleteProvider = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/provider/" + id
        })
    };
}]);
