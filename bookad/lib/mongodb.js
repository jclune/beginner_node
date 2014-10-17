var mongo = require('mongodb')
   ,config = require('../config/mongodb')['development'];

var server = new mongo.Server(config.server.host, config.server.port, config.server.option)
   ,client = new mongo.MongoClient(server, config.option);

exports.open = function(callback) {
  client.open(function(err, client) {
    var db = client.db(config.database);
    exports.bookad = db;
    callback(err, db);
  });
}
