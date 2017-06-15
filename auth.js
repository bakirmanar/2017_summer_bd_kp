"use strict";
var logger = require('./backend/cms/logger');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var users = require('./backend/cms/mongoose').userModel;

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(user, done) {
    users.findById(user, function(err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        usernameLowerCase: true
    },

    function(username, password, done) {
        users.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (password != user._doc.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });

    }
));

exports.ensureAuthenticated = function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        } else {
            res.status(401).json({msg: 'You aren’t authenticated!'});
        }
};

exports.init = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/api/login', passport.authenticate('local'), function (req, res) {
             if (req.isAuthenticated()) {
                res.json(req.user._doc);
            }
        }
    );

    app.get('/logout', function(req, res){
        logger.info('Logout');
        res.clearCookie('local');
        req.logout();
        res.end();
    });
};