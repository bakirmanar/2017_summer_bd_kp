app.service('userService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.watchCurrentUser = function(){
        if(!that.currentUser){
            var now = new Date;
            now = now.getMinutes().toString() + now.getMilliseconds();
            that.currentUser = {
                id: now,
                username: "U" + now
            }
        }
        return that.currentUser;
    };

    this.login = function(username, password){
        return $http({
                method: "post",
                url: apiUrl + "api/login",
                data: {
                    username: username,
                    password: password
                }
            })
            .then(function(response){
                that.currentUser = response.data;
            })
    };

}]);