app.service('gettingService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getGetting = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/getting"
        })
    };

    this.postGetting = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/getting",
            data: data
        })
    };

    this.deleteGetting = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/getting/" + id
        })
    };
}]);
