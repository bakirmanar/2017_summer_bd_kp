"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var queryBuilder = require("./buildQuery");

module.exports = function (app, connection) {
  var authentication = {};
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var query = queryBuilder.select("users", "*", {id: id});
    connection.query(query, function (error, results, fields) {
      if (error) {
        done(error);
      } else {
        done(null, results[0]);
      }
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      usernameLowerCase: true
    },
    function(req, username, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        var query = queryBuilder.select("users", "*", {username: username, password: password});
        connection.query(query, function (error, results, fields) {
          if (error) {
            done(error);
          } else {
            console.log('User is authenticated. User:' + username);
            done(null, results[0]);
          }
        });
      });
    }
  ));

  authentication.ensureAuthenticated = function  (req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.status(401).json({msg: 'You aren’t authenticated!'});
  };

  authentication.getCurrentUser = function (req, res, next){
    console.log('getCurrentUser API');
    if(req.user) {
      delete req.user.password;
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(req.user);
  };

  authentication.init = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/api/login',
      passport.authenticate('local'),
      function(req, res) {
        var user = {
          "id": req.user.id,
          "username": req.user.username,
          "role": req.user.role
        };
        res.send(user);
      }
    );

    app.get('/api/logout', function(req, res){
      // clear the remember me cookie when logging out
      console.log('Logout. username:' + req.user.username);
      res.clearCookie('local');
      req.logout();
      res.end();
    });

    app.get('/api/user/current', function(req, res){
      var user;
      if (req.user){
        user = {
          "id": req.user.id,
          "username": req.user.username,
          "role": req.user.role
        };
      }
      res.send(user || null);
    });
  };

  return authentication;
};

