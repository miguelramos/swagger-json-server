"use strict";
/**
 * ----------------------------------------------------------------------------
 * index.js
 * ----------------------------------------------------------------------------
 *
 * This file is part of MockupServer Project.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var app      = require('express')();
var parser   = require('body-parser');
var dbserver = require('json-server');
var db       = require('./db.json');
var cors     = require('cors');

app.start = function () {
  var server = app.listen(app.get('port'), app.get('host'), function(){
    app.emit('started');

    var host = server.address().address;
    var port = server.address().port;

    console.log('Testing app listening at http://%s:%s', host, port);

    process.on('SIGINT', function () {
      console.log('Testing app has shutdown.');
      console.log('Testing app was running for %s seconds.', Math.round(process.uptime()).toString());
      process.exit(0);
    });
  });

  return server;
};

app.set('host', '127.0.0.1');
app.set('port', 8002);
app.set('etag', false);

app.use(cors());
app.use(dbserver.defaults);
app.use(dbserver.router(db));

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.start();