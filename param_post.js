'use strict';

var httpd = require('http').createServer(function(req, res){
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  var pathname = require('url').parse(req.url).pathname;
  if (pathname === '/input' || pathname === '/') {
    res.write('<form action="output" method="post">');
    res.write('<input type="text" name="name"><input type="submit">');
    res.write('</form>');
    res.write('<h2>こんにちは</h2>');
    res.end();
  } else if (pathname === '/output') {
    var buf = '';
    req.setEncoding('utf-8');
    req.on('data', function(chunk) {
      buf += chunk;
    });
    req.on('end', function() {
      var body = require('querystring').parse(buf);
      res.write('Hello, ' + body.name);
      res.end();
    });
  }
});
httpd.listen(8080);
