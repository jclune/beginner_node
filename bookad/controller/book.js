var mongo = require('mongodb');
var mongodb = require('../lib/mongodb');
var async = require('async');

exports.search = {};
exports.search.html = function(req, res) {
  res.render('book/search', { title: '書籍検索' });
}

exports.detail = {};
exports.detail.html = function(req, res) {
  async.waterfall([
    function(next) {
      mongodb.bookad.collection('books', next);
    },
    function(books, next) {
      books.findOne({_id: new mongo.ObjectID(req.params._id)}, next);
    }
  ], function(err, book) {
    if (err) throw err;
    if (book) {
      res.render('book/detail', { title: '書籍情報詳細', book: book });
    } else {
      res.redirect('/');
    }
  });
}

exports.add = function(req, res) {
  var book = bookExchange(req.body.book);

  async.waterfall([
    function(next) {
      mongodb.bookad.collection('books', next);
    },
    function(books, next) {
      books.save(book, next);
    }
  ], function(err) {
    if (err) throw err;
    res.redirect('/');
  });
}

exports.add.html = function(req, res) {
  res.render('book/add', { title: '書籍追加' });
}

exports.modify = function(req, res) {
  if (!req.body.book._id) {
    req.body.book._id = req.params._id;
  }
  var book = bookExchange(req.body.book);

  async.waterfall([
    function(next) {
      mongodb.bookad.collection('books', next);
    },
    function(books, next) {
      books.save(book, next);
    }
  ], function(err) {
    if (err) throw err;
    res.redirect('/');
  });
}

exports.modify.html = function(req, res) {
  async.waterfall([
    function(next) {
      mongodb.bookad.collection('books', next);
    },
    function(books, next) {
      books.findOne({_id: new mongo.ObjectID(req.params._id)}, next);
    }
  ], function(err, book) {
    if (err) throw err;
    if (book) {
      res.render('book/modify', { title: '書籍情報編集', book: book });
    } else {
      res.redirect('/');
    }
  });
}

exports.delete = function(req, res) {
  async.waterfall([
    function(next) {
      mongodb.bookad.collection('books', next);
    },
    function(books, next) {
      books.remove({_id: new mongo.ObjectID(req.params._id)}, next);
    }
  ], function(err) {
    if (err) throw err;
    res.send(200);
  });
}

exports.delete.html = function(req, res, next) {
  // TODO
  next();
}

function bookExchange(book) {
  var newbook = {};
  if (book._id) newbook._id = new mongo.ObjectID(book._id);
  if (book.isbn) newbook.isbn = book.isbn;
  if (book.name) newbook.name = book.name;
  newbook.author = book.author.split(',').map(trim).filter(notEmpty);
  newbook.tag = book.tag.split(',').map(trim).filter(notEmpty);
  if (book.price) {
    var price = parseInt(book.price);
    if (price == 0 || price) newbook.price = price;
  }
  if (book.purchaseDate) newbook.purchaseDate = new Date(book.purchaseDate);
  if (book.finishDate) newbook.finishDate = new Date(book.finishDate);
  if (book.comment) newbook.comment = book.comment;
  return newbook;
}

function trim(s) {
  return s.toString().trim();
}

function notEmpty(s) {
  return s.length != 0;
}
