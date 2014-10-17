var should = require('should')
   ,myutil = require('../lib/myutil2');

describe('myutil module', function() {
  describe('#csvparse(str)のテスト', function() {
    describe('自明な値のテスト', function() {
      it('\'\' は長さが0の配列になる', function() {
        var ary = myutil.csvparse('');
        ary.should.eql([]);
      });
    }); 

    describe('"を使わない場合のテスト', function() {
      it('\',,\' は[\'\', \'\', \'\']になる', function() {
        var ary = myutil.csvparse(',,');
        ary.should.eql(['', '', '']);
      });

      it('\',a,\' は[\'\', \'a\', \'\']になる', function() {
        var ary = myutil.csvparse(',a,');
        ary.should.eql(['', 'a', '']);
      });

      it('\'a,b,c\' は[\'a\', \'b\', \'c\']になる', function() {
        var ary = myutil.csvparse('a,b,c');
        ary.should.eql(['a', 'b', 'c']);
      });

      it('\'a,b c,d\' は[\'a\', \'b c\', \'d\']になる', function() {
        var ary = myutil.csvparse('a,b c,d');
        ary.should.eql(['a', 'b c', 'd']);
      });
    });

    describe('"を使った場合のテスト', function() {
      it('\'"a","b","c"\' は[\'a\', \'b\', \'c\']になる', function() {
        var ary = myutil.csvparse('"a","b","c"');
        ary.should.eql(['a', 'b', 'c']);
      });

      it('\'"a","b","c,d"\' は[\'a\', \'b\', \'c,d\']になる', function() {
        var ary = myutil.csvparse('"a","b","c,d"');
        ary.should.eql(['a', 'b', 'c,d']);
      });

      it('\'"a","b","""c"""\' は[\'a\', \'b\', \'"c"\']になる', function() {
        var ary = myutil.csvparse('"a","b","""c"""');
        ary.should.eql(['a', 'b', '"c"']);
      });

      it('\'"a","b","c""d"\' は[\'a\', \'b\', \'c"d\']になる', function() {
        var ary = myutil.csvparse('"a","b","c""d"');
        ary.should.eql(['a', 'b', 'c"d']);
      });

      it('\'"a","b","c d"\' は[\'a\', \'b\', \'c d\']になる', function() {
        var ary = myutil.csvparse('"a","b","c d"');
        ary.should.eql(['a', 'b', 'c d']);
      });

      it('\'"a","b","c\\nd"\' は[\'a\', \'b\', \'c\\nd\']になる', function() {
        var ary = myutil.csvparse('"a","b","c\nd"');
        ary.should.eql(['a', 'b', 'c\nd']);
      });

      it('\'"","",""\' は[\'\', \'\', \'\']になる', function() {
        var ary = myutil.csvparse('"","",""');
        ary.should.eql(['', '', '']);
      });

      it('\',"a",\' は[\'\', \'a\', \'\']になる', function() {
        var ary = myutil.csvparse(',"a",');
        ary.should.eql(['', 'a', '']);
      });

      it('\',,"a,b","c",,"d",\' は[\'\', \'\', \'a,b\', \'c\', \'\', \'d\', \'\']になる', function() {
        var ary = myutil.csvparse(',,"a,b","c",,"d",');
        ary.should.eql(['', '', 'a,b', 'c', '', 'd', '']);
      });

      it('\'a,"b",c\' は[\'a\', \'b\', \'c\']になる', function() {
        var ary = myutil.csvparse('a,"b",c');
        ary.should.eql(['a', 'b', 'c']);
      });
    });
  });

  describe('#csvparse(str)のエラーテスト', function() {
    it('\'"a,b,c\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('"a,b,c');
      }).should.throw();
    });

    it('\'a,b,c"\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('a,b,c"');
      }).should.throw();
    });

    it('\'a,""b,c\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('a,""b,c');
      }).should.throw();
    });

    it('\' a,b,c\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse(' a,b,c');
      }).should.throw();
    });

    it('\'a,b,c \' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('a,b,c ');
      }).should.throw();
    });

    it('\'a, b,c\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('a, b,c');
      }).should.throw();
    });

    it('\'a,b ,c\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('a,b ,c');
      }).should.throw();
    });

    it('\' "a","b","c"\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse(' "a","b","c"');
      }).should.throw();
    });

    it('\'"a","b","c" \' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('"a","b","c" ');
      }).should.throw();
    });

    it('\'"a", "b","c"\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('"a", "b","c"');
      }).should.throw();
    });

    it('\'"a","b" ,"c"\' はフォーマットエラー', function() {
      (function() {
        myutil.csvparse('"a","b" ,"c"');
      }).should.throw();
    });
  });
});