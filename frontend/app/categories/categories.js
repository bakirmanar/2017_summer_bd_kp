app.controller('categoriesPageController', function ($scope, categoriesService, Notification) {
  $scope.resetNewCategory = function () {
    $scope.newCategory = {
      name: ""
    }
  };
  $scope.resetNewCategory();
  $scope.isDataLoaded = false;
  $scope.categories = [];

  categoriesService.getCategories().then(function (response) {
    $scope.categories = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveCategory = function (data) {
    return categoriesService.postCategory(data).then(function (response) {
      Notification.success("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteCategory = function (id) {
    return categoriesService.deleteCategory(id).then(function (response) {
      var index = findCategoryById(id);
      if (index !== -1) {
        $scope.categories.splice(index, 1);
      }
      Notification.success("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewCategory = function ($event) {
    if ($event.keyCode === 13) {
      categoriesService.postCategory($scope.newCategory).then(function (response) {
        console.log(response);
        $scope.categories.push(response.data.body);
        $scope.resetNewCategory();
        Notification.success("Изменения сохранены");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findCategoryById(id) {
    var index = -1;
    for (var i = 0; i < $scope.categories.length; i++) {
      if ($scope.categories[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});