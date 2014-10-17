var fs = require('fs');
var path = 'package.json';

fs.open(path, 'r', function(err, fd) {
	if (err) throw err;
	fs.stat(path, function(err, stats) {
		if (err) throw err;
		fs.read(fd, new Buffer(stats.size), 0, stats.size, null, function(err, bytesRead, buf) {
			if (err) throw err;
			if (!bytesRead) return;
			console.log(buf.toString());
			fs.close(fd);
		});
	});
});