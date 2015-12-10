var promise 		= require('bluebird');
var resilient		= require('resilient');
var _				= require('underscore');

exports.create =  function (cnf, lgr, utls) {
	var config 	= cnf;
	var logger 	= lgr;
	var utils 	= utls;

	return (function () {
	    return {
	        authenticate: function (input) {

	        	if (!input.username || input.username.length == 0 ||
	        			!input.password || input.password.length == 0) {
	        		return promise.reject({
	        			code: 400,
	        			msg: 'Missing username and/or password'
	        		})
	        	}
	        	var headerValue = 
	        		new Buffer(input.username + ':' + input.password).toString('base64');

				var client = resilient({
					service: {
						servers: [config.authentication.url],
						timeout: config.authentication.timeoutMs,
						headers: {
							authorization: headerValue
						}
					}
				});

				var clientCall = promise.promisify(client.get, {context: client});
				return clientCall(config.authentication.path)
					.then(function(result){
						result = utils.xml2Json(result.body);
						result = result['principal-response'];

						if (result['success-code'] === 'true') {
							result = result.principal;
							result = {
								id:	result.id,
								email: _.find(result.profile.field, function(field){ 
											return field.name == 'email'; 
										})['$t'],
								isAuthenticated: result.status == 0							

							};
							return promise.resolve(result);
						} else {
							return promise.reject({code: 401, msg: 'Invalid username and/or password'});
						} 
					})
					.catch(function(err){
						logger.error(err);
						return promise.reject(err);
					});
	        },  
	    };
	}());
};