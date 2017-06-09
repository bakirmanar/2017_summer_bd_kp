app.service('bookingService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getBooking = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/booking"
        })
    };

    this.postBooking = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/booking",
            data: data
        })
    };

    this.deleteBooking = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/booking/" + id
        })
    };
}]);
