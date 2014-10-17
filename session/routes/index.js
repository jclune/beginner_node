var express = require('express');
var router = express.Router();
var verify = require('../lib/verify');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/countup', function(req, res){
  var count = req.session.count || 0;
  req.session.count = ++count;
  res.send(String(count));
});

router.get('/before', function(req, res){
  req.flash('msg', 'message1');
  req.flash('msg', 'message2');
  res.redirect('/after');
});

router.get('/after', function(req,res){
  var msg = req.flash('msg');
  res.send(msg);
});

router.get('/login',function(req,res){
  var type = req.param('userType');
  var u = req.session.user || req.param('user','');
  var p = req.param('password','');

  var count = req.session.count || 0;
  req.session.count = ++count;
  var error1 = relogin = req.flash('error1')[0];
  var error2;

  if (type === 'guest'){
    req.session.user = 'ゲスト';
    res.redirect('login_result');
  } else if (type === 'admin' && verify.user(u,p)){
    req.session.user = u;
    res.redirect('login_result');
  } else {
    // if (type !== 'guest' && type !== 'admin' && count !== 1 && !relogin){
    //   error1 = 'Please select user or guest';
    // } else {
      if ( u === '' && count !== 1 && !relogin) {
        error1 = 'Please type your username';
      }
      if ( p === '' && count !== 1 && !relogin) {
        error2 = 'Please type your password';
      }
      if ( u !== '' && p !== '' ){
        error1 = 'Username or password is incorrect';
      }
    //} end userType
  res.render('login', { title: 'Login', placeHolder: u, error1: error1, error2: error2 });
  }
});

router.get('/login_result',function(req,res){
  if (req.session.user){
    if (req.param('logout')){
      req.session.user = undefined;
      req.flash('error1', 'please log in');
      res.redirect('login');
    } else{
      res.render('login_result', { title: 'Login Result', user: req.session.user });
    }
  } else{
    req.session.user = undefined;
    req.flash('error1', 'please log in');
    res.redirect('login');
  }
});


module.exports = router;
