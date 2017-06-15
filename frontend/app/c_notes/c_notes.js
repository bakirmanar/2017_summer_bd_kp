app.controller('c_notesPageController', function ($scope, $filter, $state, authService, c_notesService, Notification, $rootScope) {


  $rootScope.currentPage = "Бланки строгой отчетности";
  $scope.resetNewC_note = function () {
    $scope.newC_note = {
      date: new Date()
    }
  };
  $scope.resetNewC_note();
  $scope.isDataLoaded = false;
  $scope.c_notes = [];

  c_notesService.getC_notes().then(function (response) {
    response.data.forEach(function (item) {
      item.date = new Date(item.date);
    });
    $scope.c_notes = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveC_note = function (data) {
    return c_notesService.postC_note(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteC_note = function (id) {
    return c_notesService.deleteC_note(id).then(function (response) {
      var index = findC_noteById(id);
      if (index !== -1) {
        $scope.c_notes.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewC_note = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newC_note.date = $filter('date')($scope.newC_note.date, 'yyyy-MM-dd');

      c_notesService.postC_note($scope.newC_note).then(function (response) {
        response.data.body.date = new Date(response.data.body.date);
        $scope.c_notes.push(response.data.body);
        $scope.resetNewC_note();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findC_noteById(id) {
    var index = -1;
    for (var i = 0; i < $scope.c_notes.length; i++) {
      if ($scope.c_notes[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});