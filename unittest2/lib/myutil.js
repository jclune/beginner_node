exports.csvparse = function(str){
	//errors
	if (str.search(/"\w,/) > 0){
		throw new Error("one entry has extra double quotes");
	}
	if (str.search(/,""\w""/) > 0){
		throw new Error("one entry has asymetric double quotes");
	}
	if (str.search(/"/) > 0){
		throw new Error("the only entry has asymetric double quotes");
	}
	str = "[" + str + "]";
	var addSpace = str;
	if (str.search(/(,",\S)/) > 0){
		addSpace = addSpace.replace(/(,",)/g, '$& ');
	} else if (str.search(/(",\S)/) > 0){
		addSpace = addSpace.replace(/(",)/g, '$& ');
	}
	if (str.search(/(\w',\S)/) > 0){
		addSpace = addSpace.replace(/(\w',)/g, '$& ');
	}	
	if (str.search(/(\w,\w)/) > 0){
		addSpace = addSpace.replace(/(\w,)/g, '$& ');
	}
	var replaceDouble = addSpace;
	if (replaceDouble.search(/""""""/) > 0){
		replaceDouble = replaceDouble.replace(/("".+"")/g, "'\"\"'");
	} else{
		replaceDouble = replaceDouble.replace(/"/g,"'");		
	}
	var quoteWord = replaceDouble;
	if (replaceDouble.search(/'''\w+'''/) > 0){
		quoteWord = replaceDouble.replace(/'''(\w+)'''/g,"'\"$1\"'");
	} else if (replaceDouble.search(/('\w+')/) > 0){
		quoteWord = replaceDouble.replace(/('\w+')/g,'"$&"');
	} else{
		quoteWord = replaceDouble.replace(/(\w+)/g,"'$&'");		
	}
	return quoteWord;
}