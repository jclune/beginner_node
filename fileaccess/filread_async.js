var fs = require('fs'),
	async = require('async');
var path = 'package.json';

var fd;
async.waterfall([
	function(next) {
		fs.open(path, 'r', next);
	},
	function(_fd, next) {
		fd = _fd;
		fs.stat(path, next);
	},
	function(stats, next) {
		fs.read(fd, new Buffer(stats.size), 0, stats.size, null, next);
	},
	function(byteRead, buf, next) {
		if (!byteRead) return next(null);
		console.log(buf.toString());
		next(null);
	}
], function(err) {
	if (fd) fs.close(fd);
	if (err) console.log('Error: '+ err);
});