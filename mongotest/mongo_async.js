var mongo = require('mongodb'), Server = mongo.Server, MongoClient = mongo.MongoClient;
var mongoClient = new MongoClient(new Server('localhost', 27017), {journal: true});
var async = require('async');

var user = { name: 't.matsumoto', age: 20 };
var usersCollection;

async.waterfall([
  function(next) {
    mongoClient.open(next);
  },
  function(client, next) {
    var db = client.db('axiz');
    db.collection('users', next);
  },
  function(users, next) {
    usersCollection = users;
    users.save(user, next);
  },
  function(docs, next) {
    usersCollection.find({ age: { '$gte': 18 } }).toArray(next);
  },
  function(list, next) {
    list.forEach(function(u) {
      console.log(u);
    });
    next();
  }
], function(err) {
  mongoClient.close();
  if (err) console.error(err);
});