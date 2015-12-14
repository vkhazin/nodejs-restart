var promise 		= require('bluebird');
var config 			= require('../config/default.json');
var logger 			= require('../logger').create();
var someModule		= require('../someModule').create(config, logger);

//There are assertion libraries such as chai and asset 
//I have decided to keep dependencies to min for this seed project

describe('someModule', function() {
	describe('#helloWorld()', function() {
		it('Should return hello world!', function(done) {
			someModule.helloWorld()
				.then(function(response){
					if (response.msg !== 'hello world!') {
						throw new Error('Response did meet expectations');
					}
				})
				.done(function(){
					done();
				});

		});
	});

	describe('#helloWorld(\'vlad\')', function() {
		it('Should return hello vlad!', function(done) {
			someModule.helloWorld('vlad')
				.then(function(response){
					if (response.msg !== 'hello vlad!') {
						throw new Error('Response did meet expectations');
					}
				})
				.done(function(){
					done();
				});

		});
	});		
});