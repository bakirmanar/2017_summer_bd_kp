app.service('producersService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getProducers = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/producers"
        })
    };

    this.postProducer = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/producer",
            data: data
        })
    };

    this.deleteProducer = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/producer/" + id
        })
    };
}]);
