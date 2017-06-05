app.service('storagesService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getStorages = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/storages"
        })
    };

    this.postCategory = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/storage",
            data: data
        })
    };

    this.deleteStorage = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/storage/" + id
        })
    };
}]);
