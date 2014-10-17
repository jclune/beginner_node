var mongo = require('mongodb'),
  Server = mongo.Server,
  MongoClient = mongo.MongoClient,
  mongoClient = new MongoClient(new Server('localhost', 27017, {journal : true}));

mongoClient.open(function(err){
  var db = mongoClient.db('axiz');
  if (err) throw err;
  db.collection('users', function(err, users){
    if (err) throw err;
    var user = {name : 'justin', age : 25};
    users.save(user, function(err, docs){
      if (err) throw err;
      users.find({age: {'$gte' : 24}}).toArray(function(err,list){
        if (err) throw err;
        list.forEach(function(u){
          console.log(u);
        });
        mongoClient.close();
      });
    });
  });
});