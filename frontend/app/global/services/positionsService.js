app.service('positionsService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getPositions = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/positions"
        })
    };

    this.postPosition = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/position",
            data: data
        })
    };

    this.deletePosition = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/position/" + id
        })
    };
}]);
