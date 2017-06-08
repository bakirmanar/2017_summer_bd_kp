app.service('sellingService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getSelling = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/selling"
        })
    };

    this.postSelling = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/selling",
            data: data
        })
    };

    this.deleteSelling = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/selling/" + id
        })
    };
}]);
