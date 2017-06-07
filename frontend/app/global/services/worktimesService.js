app.service('worktimesService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getWorktimes = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/worktimes"
        })
    };

    this.postWorktime = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/worktime",
            data: data
        })
    };

    this.deleteWorktime = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/worktime/" + id
        })
    };
}]);
