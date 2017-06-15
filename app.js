"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var formidable = require('formidable');
//var fs = require('fs-extra');
var qt = require('quickthumb');
//var util = require('util');
var multiparty = require('connect-multiparty');

var logger = require('./backend/cms/logger');
var config = require('./backend/cms/config');
var errorHandler = require('./backend/cms/errorHandler');

var app = express();
var http = require('http');

app.set('port', config.port);
app.set('view engine');
app.use(express.static('app'));
app.use('/api', bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(qt.static(__dirname + '/'));
app.use(express.static('./dist'));
app.use(errorHandler);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session({saveUninitialized: true,
  resave: true,
  secret: 'SECRET' }));


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'pharmacy'
});
connection.connect();
var authentication = require('./backend/cms/authentication')(app, connection);
authentication.init(app);
require('./backend/cms/api/module')(app, connection);

app.listen(app.get('port'), function () {
  logger.info('Pharmacy server is up on port:' + app.get('port'));
});
