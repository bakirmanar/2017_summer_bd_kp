app.service('vacationsService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getVacations = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/vacations"
        })
    };

    this.postVacation = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/vacation",
            data: data
        })
    };

    this.deleteVacation = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/vacation/" + id
        })
    };
}]);
