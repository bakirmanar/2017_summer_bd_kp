app.constant("apiUrl", window.location.origin+"/")
.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});