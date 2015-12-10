/*********************************************************************************
Dependencies
**********************************************************************************/
var restify 	    = require('restify');
var config 		    = require('config');
var promise         = require('bluebird');
var logger          = require('./logger').create(logger);
var utils           = require('./utils').create(logger);
var authC           = require('./authC').create(config, logger, utils);
var authZ           = require('./authZ').create(config, logger, utils);
/*********************************************************************************/

/**********************************************************************************
Configuration
**********************************************************************************/
var appInfo 		= require('./package.json');
var port 			= process.env.PORT || 3000;
var server 			= restify.createServer();
/*********************************************************************************/

/**********************************************************************************
Constants
**********************************************************************************/
var routePrefix                     = '/v1';
/*********************************************************************************/

/**********************************************************************************
Setup
**********************************************************************************/
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});
server.use(restify.gzipResponse());

/**********************************************************************************
End-points
**********************************************************************************/
//Echo
server.get({path: routePrefix + '/echo', flags: 'i'}, echo);
server.get({path: routePrefix, flags: 'i'}, echo);
server.get({path: '/', flags: 'i'}, echo);
server.get({path: '/echo', flags: 'i'}, echo);

function echo(req, res, next) {
    var info = {
        name: appInfo.name,
        version: appInfo.version,
        description: appInfo.description,
        author: appInfo.author,
        node: process.version
    };
    res.send(info);
    next();
}    

//AuthC
server.post({path: routePrefix + '/authc', flags: 'i'}, authenticate);

function authenticate(req, res, next) {
    var xRequestId = utils.getXRequestId(req);
    var xDeviceType = utils.getXDeviceType(req);

    var response;

    authC.authenticate(parseRequest(req))
        .then(function(result) {     
            response = result
            return promise.resolve(authZ.authorize(result.id));        
        })
        .then(function(result) {
            response.isAuthorized = true;
            res.send(response);
            logger.info({
                xRequestId: xRequestId,
                xDeviceType: xDeviceType,
                response: response
            });    
        })
        .catch(function(err) {           
            var msg = 'x-request-id: ' + xRequestId + ', x-device-type: ' + xDeviceType;
            msg += '\n err code: ' + err.code + ' err msg: ' + err.msg;
            logger.error(msg);

            if (err.code == 401) {
                res.send(new restify.errors.UnauthorizedError(err.msg));
            } else if (err.code == 403) {
                res.send(new restify.errors.ForbiddenError(err.msg));
            } else if (err.code == 400) {
                res.send(new restify.errors.BadRequestError(err.msg));
            } else {
                res.send(new restify.errors.InternalServerError(err.msg));
            }        
        })
        .done(function(){
            next();
        });
}; 

//AuthZ
//server.get({path: routePrefix + '/authz/:id', flags: 'i'}, authorize); 

/*********************************************************************************/

/**********************************************************************************
Functions
**********************************************************************************/
function parseRequest(req) {
    var output = {};
    if (typeof req.body == 'string') {
        output = JSON.parse(req.body);
    } else {
        output = req.body || {};
    }
    return output;
}
/*********************************************************************************/

/**********************************************************************************
Start the server
**********************************************************************************/
server.listen(port, function() {
	var msg = 'Starting service using port \'{port}\' and environment \'{environment}\''
				.replace('{port}', port)
				.replace('{environment}', process.env.NODE_ENV)
	logger.log(msg);
});
/********************************************************************************/