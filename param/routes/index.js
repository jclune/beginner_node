var express = require('express');
var router = express.Router();
var translate = require('translate');

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });
router.get('/test', function(req, res) {
  res.send(req.query);
});

router.route('/')
  .get(function(req, res) {
    res.send(req.query.name);
  })
  .post(function(req, res) {
    res.send(req.body.name);
  });

router.get('/test/:id', function(req, res) {
  res.send(req.params.id);
});

router.get('/', function(req, res) {
  res.send(req.param('name', 'No name'));
});

//test search
router.get('/search-t', function(req, res) {
  var output = translate.lookup(req.param('word','no words'))  
  res.send(output);
});

router.route('/search-t')
  .get(function(req, res) {
    res.send(req.query.word);
  });

//search
router.get('/search', function(req, res) {
  var input = req.param('word','no words');
  var output = translate.lookup(input);
  res.render('search', {translation: output, placeholder: input});
});

router.route('/search')
  .get(function(req, res) {
    res.send(req.query.word);
  });

//search.txt
router.get('/search:format', function(req, res) {
  translate.filewrite('../search.txt', function(ws, done) {
    var input = req.param('word','no words');
    var output = translate.lookup(input);
    ws.write(output);
    done();
  });
});

router.route('/search:format')
  .get(function(req, res) {
    res.send(req.query.word);
  }); 

module.exports = router;

