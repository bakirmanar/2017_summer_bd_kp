'use strict';

saharokApp.factory('userService',
    ['$http', function ($http) {
        return {
            logout: function(){
                return $http.get("/logout");
            },
            login: function(user){
                return $http.post("/api/login", user)
            }
        };
    }]);
