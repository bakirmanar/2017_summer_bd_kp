app.service('c_notesService', ['apiUrl', '$http', function (apiUrl, $http) {

    var that = this;

    this.getC_notes = function(){
        return $http({
            method: "get",
            url: apiUrl + "api/c_notes"
        })
    };

    this.postC_note = function(data){
        return $http({
            method: "post",
            url: apiUrl + "api/c_note",
            data: data
        })
    };

    this.deleteC_note = function(id){
        return $http({
            method: "delete",
            url: apiUrl + "api/c_note/" + id
        })
    };
}]);
