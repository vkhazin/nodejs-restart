const promise 		        = require('bluebird');

//configuration and logging dependency injection
exports.create =  function (cnf, lgr) {

  const config 	= cnf;
  const logger = lgr;

  var healthCheckCounter = 0;
  var healthCheckMaxCount = config.healthCheck.maxCallsBeforeError;

  return (function () {
    return {
      ping: function() {
        healthCheckCounter++;
        if (healthCheckCounter <= healthCheckMaxCount) {
          return promise.resolve({
            msg: 'Still alive! Health Check count: ' + healthCheckCounter + ' out of ' + healthCheckMaxCount
          });
        } else {
          return promise.reject({
            msg: 'Health check count of ' + healthCheckCounter + ' exceeds max retries of ' + healthCheckMaxCount + ', restart is required'
          })
        }
      }
    };
  }());
};
