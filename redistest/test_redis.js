var redis = require('redis'),
  client = redis.createClient();

client.on('error', function(err) {
  throw err;
});

client.set('test:name', 'justin', redis.print);

client.get('test:name', function(err, name) {
  if (err) return;
  console.log(name);
  client.end();
})