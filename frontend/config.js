app.constant("apiUrl", window.location.origin+"/")
.config(function ($httpProvider, NotificationProvider) {
$httpProvider.defaults.withCredentials = true;

  NotificationProvider.setOptions({
    delay: 5000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'bottom'
  });
});