app.service('returnsService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getReturns = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/returns"
        })
    };

    this.postReturn = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/return",
            data: data
        })
    };

    this.deleteReturn = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/return/" + id
        })
    };
}]);
