var express = require('express');
var router = express.Router();

var auth = require('../lib/auth');
var validation = require('../validation');

router.route('/login')
  .get(login_get)
  .post(validation.login, invalid, function(req, res) {
    var user = req.user;
    if (user.type == 'guest') {
      user.name = 'ゲスト';
    } else if (user.type == 'admin') {
      if (!auth.doLogin(user.name, user.password)) {
        req.errors.push('ログインできませんでした。');
        return login_get(req, res);
      }
    }
    req.session.user = user;
    return res.redirect('/login_result');
  });

router.post('/logout', function(req,  res) {
  req.session.destroy(function(err) {
    if (err) console.log(err);
    res.redirect('/login');
  });
});

router.get('/login_result', function(req, res) {
  var user = req.session.user;
  res.render('result', {
    title: 'ログイン結果',
    user: user
  });
});

module.exports = router;

function login_get(req, res) {
  var errors = req.flash('error');
  if (req.errors) {
    errors = errors.concat(req.errors);
  }

  res.render('index', {
    title: 'ログイン',
    user: req.param('user', {}),
    errors: errors
  });
}

function invalid(req, res, next) {
  if (req.errors.length == 0) {
    next();
  } else {
    login_get(req, res, next);
  }
}
