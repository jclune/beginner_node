var Browser = require('zombie'),
  browser = new Browser({site: 'http://localhost:3000'}),
  should = require('should');

require('../bin/www');

describe('GET /', function(){
  it('?name=justin', function(done){
    browser.visit('/?name=justin').then(function(){
      browser.success.should.be.ok;
      browser.text('body').should.equal('justin');
      done();
    });
  });
});