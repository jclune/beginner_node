/* 第6問 */
var fs = require('fs');

function filewrite(path, callback) {
  var ws = fs.createWriteStream(path);
  callback(ws);
  ws.end();
}


/* 第6問ex 非同期対応版 */
function filewrite2(path, callback) {
  var ws = fs.createWriteStream(path);
  callback(ws, function() {
    ws.end();
  });
}

filewrite('sample.txt', function(ws) {
  ws.write('Hello2\nJustin');
});

filewrite2('sample2.txt', function(ws, done) {
  ws.write('Hello2\nJustin');
  done();
});