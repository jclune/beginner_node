
function test( message, callback){
	console.log(message);
	if (callback) { callback(); }
}
test("hello", function(){
	console.log("goodbye");	
});

function test2( msg1, callback){
	console.log(msg1);
	if (callback) { callback("goodbye"); }
}
test2("hello", function(msg2){
	console.log(msg2);	
});

function test3( msg1, callback){
	if (callback) { 
		callback(msg1);
		callback("goodbye");
		//callback(msg1+"\ngoodbye");
	}
}
test2("hello", function(msg2){
	console.log(msg2);	
});

function test4(callback4){
	console.log("first do test4 stuff");
	callback4(function(msg){
		console.log("next do ananymous(msg) inside callback4");
		console.log("msg will be output in console");
		console.log(msg);
	})
	// callback(console.log);
}
function test5(callback5) {
	console.log("first do test5 stuff");
	console.log("Hello will be passed into callback5");
   	callback5('Hello');
} 
test4(function (cb) {
	console.log("after test4 pass in anonymous(cb) as callback4");
	console.log("in anonymous(cb) run test5(cb)");
   	test5 (cb); 
});

test4 (function (cb) {
	console.log("step 1");
   test5 (function (m) {
	console.log("step 2");
     console.log ('Goodbye');
	console.log("parameter cb in test4's callback is executed as a function. the parameter is the same as the parameter of test5's callback");
     cb (m); 
   }); 
});



