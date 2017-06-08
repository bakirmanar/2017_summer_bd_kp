app.service('timesheetService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getTimesheet = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/timesheet"
        })
    };

    this.postTimesheet = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/timesheet",
            data: data
        })
    };

    this.deleteTimesheet = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/timesheet/" + id
        })
    };
}]);
