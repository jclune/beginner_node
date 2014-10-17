var should = require('should');
var mymath = require('../lib/mymath');

describe('mymath module', function() {
    describe('#factorial(n) test', function() {
        it('factorial(5) should equal 120', function() {
            mymath.factorial(5).should.equal(120);
        });
        it('factorial(0) should return 1', function() {
            mymath.factorial(0).should.equal(1);
        });
        it('factorial(null) should throw error', function() {
        	(function() {
	            mymath.factorial(null);
	        }).should.throw();
        });
        it('factorial(undefined) should throw error', function() {
        	(function() {
	            mymath.factorial(undefined);
	        }).should.throw();
        });
        it('factorial(NaN) should throw error', function() {
        	(function() {
	            mymath.factorial(NaN);
	        }).should.throw();
        });                        
        it('factorial(Infinity) should throw error', function() {
        	(function() {
	            mymath.factorial(Infinity);
	        }).should.throw();
        });
        it('factorial(-1) should throw error', function() {
        	(function() {
	            mymath.factorial(-1);
	        }).should.throw();
        });        
    });
});