var mongo = require('mongodb')
   ,mongodb = require('../lib/mongodb')
   ,async = require('async');

exports.index = {};
exports.index.html = function(req, res){
  var criteria = {};
  var book = req.query.book;
  if (book) {
    if (book.isbn) criteria.isbn = new RegExp(book.isbn);
    if (book.name) criteria.name = new RegExp(book.name, 'i');
    if (book.author) criteria.author = {'$all': book.author.split(' ').map(regexp)};
    if (book.tag) criteria.tag = {'$all': book.tag.split(' ').map(regexp)};
    if (book.purchaseDate) {
      if (book.purchaseDate.start) {
        criteria.purchaseDate = {};
        criteria.purchaseDate['$gte'] = new Date(book.purchaseDate.start);
      }
      if (book.purchaseDate.end) {
        criteria.purchaseDate = criteria.purchaseDate || {};
        criteria.purchaseDate['$lte'] = new Date(book.purchaseDate.end);
      }
    }
  }

  async.waterfall([
    function(next) {
      mongodb.bookad.collection('books', next);
    },
    function(books, next) {
      books.find(criteria).sort({ purchaseDate: 1 }).toArray(next);
    }
  ], function(err, booksArray) {
    if (err) throw err;
    
    var books = {};
    books.header = [ '書籍名', 'タグ', '購入日', '読了日', '', '', '' ];
    books.data = booksArray;

    res.render('index', { title: '書籍管理', books: books })
  });
};

function regexp(s) {
  return new RegExp(s, 'i');
}
