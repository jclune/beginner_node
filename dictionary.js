'use strict';
var url = require('url');
var dictionary = {
    hi: 'こんにちは',
    bye: 'さようなら',
    hey: 'へい',
    hi: 'やあ'
};

var httpd = require('http').createServer(function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var url = require('url').parse(req.url, true);
    var host = url.host;
    var pathname = url.pathname;
    var queryObj = url.query;
    var query = queryObj.name;
    console.log('host ' + host);
    console.log('pathname ' + pathname);
    console.log('query ' + query);

    var queryTrimLow = '';
    if (query !== undefined) {
        queryTrimLow = query.trim().toLowerCase();
    }

    var output = 'waiting for valid input';
    if (dictionary[queryTrimLow]) {
        output = dictionary[queryTrimLow];
    } else if (queryTrimLow !== '') {
        output = 'sorry' + queryTrimLow + 'not in the dictionary';
    }

    if (pathname === '/') {
        res.write('<form action="" method="get">');
        res.write('<input type="text" name="name" value=' + queryTrimLow + '><input type="submit">');
        res.write('</form>');
        res.write('<h2>' + output + '</h2>');
        res.end();
    } else {
        res.statusCode = 404;
        res.write('404: Not found');
        res.end();
    }
});
httpd.listen(8080);