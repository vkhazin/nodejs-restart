var promise 	= require('bluebird');
var config 		= require('../config/default.json');
var logger 		= require('../logger').create();
var utils		= require('../utils').create(logger);
var authC 		= require('../authC').create(config, logger, utils);
var authZ		= require('../authZ').create(config, logger, utils);

describe('authC', function() {
	describe('#authenticate()', function() {
		it('Should authenticate as vlad.khazin@shomi.com', function(done) {
			var request = {
				username: "vlad.khazin@shomi.com",
				password: "sHomi2016"
			};

			var response = {};

			authC.authenticate(request)
				.then(function(result){
					response = result;
					return authZ.authorize(response.id);
				})
				.then(function(result) {
					response.isAuthorized = true;
					logger.info(response);
					return promise.resolve(response);
				})
				.catch(function(err){
					throw err
				})
				.done(function(){
					done();
				});
		});
	});

	describe('#authenticate()', function() {
		it('Should fail authenticating as vlad.khazin@shomi.com', function(done) {
			var request = {
				username: "vlad.khazin@shomi.com",
				password: "password"
			};

			authC.authenticate(request)
				.then(function(result){
					logger.info(result);
					throw new Error('Should have failed!');
				})
				.catch(function(err){
					logger.info('Failed as expected');
				})
				.done(function(){
					done();
				});
		});
	});	
});