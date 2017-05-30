'use strict';

var Client = require('ftp');
var fs = require('fs');

var config = require('./config');
var logger = require('./logger');
var generator = require("../../site-generator");

var c = new Client();
c.connect(config.ftp);
c.on('ready', function () {
    c.list(function (err) {
        if (err) {
            throw err;
        } else {
            logger.info('Connected to ftp! host: ' + config.ftp.host + ', user: ' + config.ftp.user);
        }
    });
});

var ftp = {
    client: c,
    upload: function (localFile, remoteFile) {
            c.put(localFile, remoteFile, function (err) {
                if (err) {
                    logger.error(err);
                } else {
                    logger.info('file ' + remoteFile + ' uploaded to ftp server');
                }
            });
    },
    createDir: function (dirPath) {
        c.mkdir(dirPath, true, function (err) {
            if (err) {
                logger.error(err);
            } else {
                logger.info('directory ' + dirPath + ' created on ftp server');
            }
        });
    }
};

module.exports = ftp;