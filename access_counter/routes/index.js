var express = require('express');
var router = express.Router();
var redisClient = require('redis').createClient();
redisClient.on('ready', function(err) {
  console.log('ready');
  console.log(arguments);
});

redisClient.on('connect', function(err) {
  console.log('connect');
  console.log(arguments);
});

redisClient.on('error', function(err) {
  console.log('error');
  console.log(arguments);
});

redisClient.on('end', function(err) {
  console.log('end');
  console.log(arguments);
});

redisClient.on('drain', function(err) {
  console.log('drain');
  console.log(arguments);
});

redisClient.on('idle', function(err) {
  console.log('idle');
  console.log(arguments);
});

router.get('/', function(req, res){
  redisClient.incr('access_counter', function(err, count) {
    res.render('index', {
      title: 'Access counter'
     ,count: count
    });
  });
});

module.exports = router;
