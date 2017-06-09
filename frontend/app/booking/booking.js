app.controller('bookingPageController', function ($scope, $filter, bookingService, productsService, Notification, $rootScope) {
  $rootScope.currentPage = "Продажи";
  $scope.resetNewBooking = function () {
    $scope.newBooking = {
      date: new Date()
    }
  };
  $scope.resetNewBooking();
  $scope.isDataLoaded = false;
  $scope.bookings = [];
  $scope.products = [];
  $scope.types = ["Наличный", "Безналичный", "Льгота"];

  bookingService.getBooking().then(function (response) {
    $scope.isDataLoaded = true;
    response.data.forEach(function (item) {
      item.date = new Date(item.date);
    });
    $scope.bookings = response.data;
  });

  productsService.getProducts().then(function (response) {
    $scope.products = response.data;
    $scope.isDataLoaded = true;
  });

  $scope.saveBooking = function (data) {
    data.date = $filter('date')(data.date, 'yyyy-MM-dd');
    return bookingService.postBooking(data).then(function (response) {
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.deleteBooking = function (id) {
    return bookingService.deleteBooking(id).then(function (response) {
      var index = findBookingById(id);
      if (index !== -1) {
        $scope.bookings.splice(index, 1);
      }
      Notification.info("Изменения сохранены");
    }, function (response) {
      Notification.error(response.data.error);
    });
  };

  $scope.saveNewBooking = function ($event) {
    if ($event.type === "click" || $event.keyCode === 13) {
      $scope.newBooking.date = $filter('date')($scope.newBooking.date, 'yyyy-MM-dd');

      bookingService.postBooking($scope.newBooking).then(function (response) {
        response.data.body.date = new Date(response.data.body.date);
        $scope.bookings.push(response.data.body);
        $scope.resetNewBooking();
        Notification.success("Новая запись сохранена");
      }, function (response) {
        Notification.error(response.data.error);
      });
    }
  };

  function findBookingById(id) {
    var index = -1;
    for (var i = 0; i < $scope.bookings.length; i++) {
      if ($scope.bookings[i].id === id) {
        index = i;
      }
    }
    return index;
  }
});