var promise 		= require('bluebird');

//configuration and logging dependency injection
exports.create =  function (cnf, lgr) {

	var config 	= cnf;
	var logger 	= lgr;

	return (function () {
	    return {
	        helloWorld: function (input) {
	        	//create json response
	        	return promise.resolve({
	        		msg: 'hello ' + (input || 'world') + '!'
	        	});
	        }
	    };
	}());
};