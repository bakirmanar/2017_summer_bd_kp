app.service('usersService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getUsers = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/users"
        })
    };

    this.getRoles = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/roles"
        })
    };

    this.postUser = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/user",
            data: data
        })
    };

    this.deleteUser = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/user/" + id
        })
    };
}]);
