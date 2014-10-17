exports.factorial = function(n) {
    if (n === undefined){
    	throw new Error('input is undefined');
    } else if (typeof n !== 'number') {
    	throw new Error('input is not a number');
    } else if (isNaN(n)) {
    	throw new Error('NaN');
    } else if (n === Infinity || n === -Infinity){
    	throw new Error('input is infinity')
    } else if (n < 0) {
        throw new Error('Only a positive number: ' + n);
    } else {
        var r = 1;
    	for (var i = n; i > 1; i--){
    		r *= i;
    	}
        return r;
    }
};