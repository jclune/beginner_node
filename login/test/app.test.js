var should = require('should')
  , Browser = require('zombie')
  , browser = new Browser({site: 'http://localhost:3000'});

require('../bin/www');

var admin = {
  name: 'admin',
  password: 'adpswd',
  dummypw: '0000'
}

describe('Web app', function() {
  describe('/login のテスト', function() {
    it('エラーメッセージは何もない', function(done) {
      browser.visit('/login').then(function() {
        browser.queryAll('ul.error li').should.be.empty;
        done();
      });
    });
    
    it('チェックがないとエラーメッセージ', function(done) {
      browser.visit('/login').then(function() {
        return browser.pressButton('form input[type="submit"]');
      }).then(function() {
        browser.queryAll('ul.error li').should.be.lengthOf(1);
        done();
      });
    });

    describe('ゲストのテスト', function() {
      it('チェックが入っていればログインできる', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('guest')
            .pressButton('form input[type="submit"]');
        }).then(function() {
          browser.text('div p').should.equal('ゲストさん こんにちは！');
          // ログアウト
          return browser.pressButton('form input[type="submit"]');
        }).then(function() {
          done();
        });
      });
    });

    describe('管理者のテスト', function() {
      it('チェックだけだとメッセージが２つでて、チェックは残ってる', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('admin')
            .pressButton('form input[type="submit"]');
        }).then(function() {
          browser.queryAll('ul.error li').should.be.lengthOf(2);
          browser.query('form input[name="user[type]"][value=admin]').checked.should.be.ok;
          done();
        });
      });
     
      it('名前だけだとエラーがでて、テキストボックスに値が残っている', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('admin')
            .fill('user[name]', admin.name)
            .pressButton('form input[type="submit"]');
        }).then(function() {
          browser.queryAll('ul.error li').should.be.lengthOf(1);
          browser.query('form input[name="user[type]"][value=admin]').checked.should.be.ok;
          browser.field('user[name]').value.should.equal(admin.name);
          done();
        });
      });
      
      it('パスワードだけだとエラーがでて、テキストボックスは空', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('admin')
            .fill('user[password]', admin.password)
            .pressButton('form input[type="submit"]');
        }).then(function() {
          browser.queryAll('ul.error li').should.be.lengthOf(1);
          browser.query('form input[name="user[type]"][value=admin]').checked.should.be.ok;
          browser.field('user[password]').value.should.be.empty;
          done();
        });
      });
      
      it('ログインに失敗するとエラーメッセージ', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('admin')
            .fill('user[name]', admin.name)
            .fill('user[password]', admin.dummypw)
            .pressButton('form input[type="submit"]');
        }).then(function() {
          browser.queryAll('ul.error li').should.be.lengthOf(1);
          browser.query('form input[name="user[type]"][value=admin]').checked.should.be.ok;
          browser.field('user[name]').value.should.equal(admin.name);
          browser.field('user[password]').value.should.be.empty;
          done();
        });
      });
    
      it('認証情報が正しければログインできる', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('admin')
            .fill('user[name]', admin.name)
            .fill('user[password]', admin.password)
            .pressButton('form input[type="submit"]');
        }).then(function() {
          browser.text('div p').should.equal('adminさん こんにちは！');
          // ログアウト
          return browser.pressButton('form input[type="submit"]');
        }).then(function() {
          done();
        });
      });
    });
  });

  describe('/login_result のテスト', function() {
    it('未ログイン状態でアクセスすると/login にリダイレクト', function(done) {
      browser.visit('/login_result').then(function() {
        browser.redirected.should.be.ok;
        browser.location.pathname.should.equal('/login');
        done();
      });
    });

    describe('認証後はそのままアクセスできる', function() {
      it('ゲスト', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('guest')
            .pressButton('form input[type="submit"]');
        }).then(function() {
          return browser.visit('/login_result');
        }).then(function() {
          browser.redirected.should.be.ng;
          // ログアウト
          return browser.pressButton('form input[type="submit"]');
        }).then(function() {
          done();
        });
      });

      it('管理者', function(done) {
        browser.visit('/login').then(function() {
          return browser
            .choose('admin')
            .fill('user[name]', admin.name)
            .fill('user[password]', admin.password)
            .pressButton('form input[type="submit"]');
        }).then(function() {
          return browser.visit('/login_result');
        }).then(function() {
          browser.redirected.should.be.ng;
          // ログアウト
          return browser.pressButton('form input[type="submit"]');
        }).then(function() {
          done();
        });
      });
    });
  });
});

