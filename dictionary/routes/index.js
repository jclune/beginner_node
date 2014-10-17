var express = require('express');
var router = express.Router();
var dict = require('../lib/dictionary');

var strategy = {
  html: function(req, res) {
    var jword = dict.translation(getWord(req));
    res.render('search', {title: '簡易英和', word: jword.word, tword: jword.trans });
  },
  json: function(req, res) {
    var word = req.param('word', '');
    if (typeof word == 'string') {
      word = [word];
    } else if (!Array.isArray(word)) {
      return res.json({});
    } else {
      var someNotString = word.some(function(w) {
        return (typeof w != 'string');
      });
      if (someNotString) {
        return res.json({});
      }
    }

    var obj = dict.translation(word).reduce(function(r, d) {
      r[d.word] = d.trans;
      return r;
    }, {});

    res.json(obj);
  },
  txt: function(req, res) {
    var trans = dict.translation(getWord(req)).trans;
    if (trans) {
      res.set('Content-Type', 'text/plain; charset=utf-8');
      res.send(trans);
    } else {
      res.send(404);
    }
  }
};

router.get('/search.:format?', function(req, res, next) {
  var format = req.param('format', 'html');
  var s = strategy[format];
  s ? s(req, res) : next();
});

router.get('/', function(req, res) {
  res.send(req.query.name);
});

router.route('/')
  .get(function(req, res) {
    res.send(req.query.name);
  });

module.exports = router;

function getWord(req) {
  var word = req.param('word', '');
  if (typeof word != 'string') {
    word = word[0] || '';
  }
  return word;
}
