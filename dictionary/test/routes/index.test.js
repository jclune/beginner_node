var request = require('supertest')
  , app = require('../../app');

describe('/ module', function() {
  describe('GET /search', function() {
    it ('HTML Formが返ってくる', function(done) {
      request(app)
        .get('/search')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it ('?word=hello もHTML Formが返ってくる', function(done) {
      request(app)
        .get('/search?word=hello')
        .expect('Content-Type', /html/)
        .expect(/value="hello"/)
        .expect(/こんにちは/)
        .expect(200, done);
    });
  });

  describe('GET /search.txt', function() {
    it ('?word=hello は こんにちは が返ってくる', function(done) {
      request(app)
        .get('/search.txt?word=hello')
        .expect('Content-Type', /plain/)
        .expect(200)
        .expect('こんにちは', done);
    });

    it ('?word=hello&word=bye は こんにちは が返ってくる', function(done) {
      request(app)
        .get('/search.txt?word=hello&word=bye')
        .expect('Content-Type', /plain/)
        .expect(200)
        .expect('こんにちは', done);
    });

    it ('?word=hoge は 404 が返ってくる', function(done) {
      request(app)
        .get('/search.txt?word=hoge')
        .expect(404, done);
    });
  });

  describe('GET /search.json', function() {
    it ('?word=hello はJSONが返ってくる', function(done) {
      request(app)
        .get('/search.json?word=hello')
        .expect('Content-Type', /json/)
        .expect(/こんにちは/)
        .expect(200, done);
    });

    it ('?word=hello&word=bye はJSONが返ってくる', function(done) {
      request(app)
        .get('/search.json?word=hello&word=bye')
        .expect('Content-Type', /json/)
        .expect(/こんにちは/)
        .expect(/さようなら/)
        .expect(200, done);
    });

    it ('?word=hoge はJSONが返ってくる', function(done) {
      request(app)
        .get('/search.json?word=hoge')
        .expect('Content-Type', /json/)
        .expect(/null/)
        .expect(200, done);
    });
  });

  describe('GET /search.xml', function() {
    it ('404が返ってくる', function(done) {
      request(app)
        .get('/search.xml')
        .expect(404, done);
    });
  });
});
