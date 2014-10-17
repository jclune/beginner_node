var redisClient = require('redis').createClient();
redisClient.on('error', function(err) {
  console.log(111);
});

module.exports = exports = function(io) {
  io.on('connection', function(socket) {
    redisClient.get('access_counter', function(err, count) {
      if (err) return console.log(err);
      socket.broadcast.emit('countup', count);
    });
  });
}
