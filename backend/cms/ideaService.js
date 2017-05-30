'use strict';

saharokApp.factory('ideaService',
    ['$http', function ($http) {
        return {
            getProducts: function () {
                return $http.get("/api/product");
            },
            getProduct: function (id) {
                return $http.get("/api/product/" + id);
            },
            updateProduct: function (product) {
                return $http.put("/api/product", product);
            },
            addProduct: function (product) {
                return $http.post("/api/product", product);
            },
            importCsv: function (provider) {
                return $http.post("/api/import/start", provider);
            },
            prepareProducts: function () {
                return $http.post("/api/import/prepare");
            },
            insertOrder: function(orders){
              return $http.post("/api/orders", orders);
            },
            downloadProducts: function () {
                return $http.get('/api/download');
            },
            getOrders: function () {
                return $http.get("/api/orders");
            },
            getOrder: function (id) {
                return $http.get("/api/order/" + id);
            },
            addOrder: function (order) {
                return $http.post("/api/order",order);
            },
            deleteOrder: function (id) {
                return $http.delete("/api/order/" + id);
            },
            updateOrder: function (order) {
                return $http.put("/api/order", order);
            },
            createCustomer: function(customer){
                return $http.post("api/customer", customer)
            },
            updateCustomer: function (customer) {
                return $http.put("/api/customer", customer);
            },
            deleteCustomer: function (id) {
                return $http.delete("/api/customer/" + id);
            },
            getCustomers: function(){
                return $http.get("/api/customers");
            },
            getCustomer: function(id){
                return $http.get("/api/customer/"+id);
            },
            deleteProduct: function (id) {
                return $http.delete("/api/product/" + id);
            },
            generate: function () {
                return $http.post('/api/generate');
            }
        };
    }]);
