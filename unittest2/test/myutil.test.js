var should = require('should');
var myutil = require('../lib/myutil');

describe('myutil module', function(){
	describe('csvparse(str) test', function(){
		it("csvparse: str should become ['str']", function(){
			myutil.csvparse("str").should.equal("['str']");
		});
		it('csvparse: "","" should become [single quotes]', function(){
			myutil.csvparse('"",""').should.equal("['', '']");
		});
		it("csvparse: 1,2,3 should become ['1','2','3']", function(){
			myutil.csvparse('1,2,3').should.equal("['1', '2', '3']");
		});
		it("csvparse: 'a', 'b', 'c' should become [single quotes in double quotes]", function(){
			myutil.csvparse("'a','b','c'").should.equal('["'+"'a'"+'", "'+"'b'"+'", "'+"'c'"+'"]');
		});
		it("csvparse: empty should become []", function(){
			myutil.csvparse('').should.equal("[]");
		});
		it('csvparse: ",", "," should become [single quoted commas]', function(){
			myutil.csvparse('",",","').should.equal("[',', ',']");
		});
		it('ccsvparse: """""" should become ""', function(){
			myutil.csvparse('""""""').should.equal("['\"\"']");
		});
		it('ccsvparse: ""a,b should throw error', function(){
			(function(){
				myutil.csvparse('""a,b');
			}).should.throw();
		});	
		it('ccsvparse: a" should throw error', function(){
			(function(){
				myutil.csvparse('a"');
			}).should.throw();
		});
		it('ccsvparse: a,""c"",d should throw error', function(){
			(function(){
				myutil.csvparse('a,""c"",d');
			}).should.throw();
		});
		it('csvparse: the hard one "aa,bb","""c""","dd\nee"', function(){
			myutil.csvparse('"aa,bb","""c""","dd\nee"').should.equal("['aa, bb', '\"c\"', 'dd\nee']");
		})		
	});
});