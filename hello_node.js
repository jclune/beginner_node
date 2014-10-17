'use strict';
var url = require('url');

var httpd = require('http').createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  res.setHeader('Content-Type', 'text/plain');
  if (pathname === '/hello'){
    res.write('Hello justin via node!');  
  }else if (pathname === '/bye'){
    res.write('Goodbye justin via node!');
  }else{
    res.statusCode = 404;
    res.write('404: Not found.');
  }
  res.end();
});
httpd.listen(8080);
