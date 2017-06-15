app.service('authService', function (apiUrl, $http, $state) {

  var that = this;

  this.login = function(data){
    return $http({
      method: "post",
      url: apiUrl + "api/login/",
      data: data
    }).then(function (response) {
      that.currentUser = response.data;
      $state.go("selling");
    })
  };

  this.logout = function(){
    return $http({
      method: "get",
      url: apiUrl + "api/logout/"
    }).then(function () {
      that.currentUser = null;
      $state.go("login");
    })
  };

  this.getCurrentUser = function(){
    return $http({
      method: "get",
      url: apiUrl + "api/user/current"
    }).then(function (response) {
      that.currentUser = response.data;
    })
  };

  this.hasRole = function (role) {
    return that.currentUser ? that.currentUser.role === role : false;
  };

  this.isLoggedIn = function () {
    return !!that.currentUser;
  }
});
