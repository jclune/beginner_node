'use strict';

var url = require('url');

var httpd = require ('http').createServer(function(req, res) {
  var query = url.parse(req.url, true).query;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello, ' + query.name);
  res.end();
});
httpd.listen(8080);
