var request = require('supertest'),
  app = require('../app');


describe('GET /', function(){
  describe('request name', function(){
    it('?name=justin', function(done){
      request(app)
        .get('/?name=justin')
        .expect(200)
        .expect('justin', done);
    });
  });
});

describe('POST /', function(){
  describe('post name', function(){
    it('post name: justin', function(done){
      var data = {
        name: 'justin'
      };
      request(app)
        .post('/')
        .send(data)
        .expect(200)
        .expect('justin', done);
    });
  });
});

describe('GET /', function(){
  describe('request id', function(){
    it('get :id', function(done){
      request(app)
        .get('/test/123')
        .expect(200)
        .expect('123', done);
    });
  });
});

//search
describe('GET /search-t', function(){
  describe('request word', function(){
    it('/search-t?word=hello', function(done){
      request(app)
        .get('/search-t?word=hello')
        .expect(200)
        .expect("こんにちは", done);
    });
    it('/search-t?word= Hello', function(done){
      request(app)
        .get('/search-t?word= Hello')
        .expect(200)
        .expect("こんにちは", done);
    });    
    it('/search-t?word=bye', function(done){
      request(app)
        .get('/search-t?word=bye')
        .expect(200)
        .expect("さよなら", done);
    });
    it('/search-t?word=hey', function(done){
      request(app)
        .get('/search-t?word=hey')
        .expect(200)
        .expect("へい", done);
    });
    it('/search-t?word=hi', function(done){
      request(app)
        .get('/search-t?word=hi')
        .expect(200)
        .expect("やあ", done);
    });
    it('/search-t?word=notindictionary', function(done){
      request(app)
        .get('/search-t?word=notindictionary')
        .expect(200)
        .expect("notindictionaryは辞書に登録されていません", done);
    });
    it('/search-t?word=hello&word=bye', function(done){
      request(app)
        .get('/search-t?word=hello&word=bye')
        .expect(200)
        .expect("こんにちは", done);
    });                
  });
});