/*********************************************************************************
Dependencies
**********************************************************************************/
const express           = require('express');
const app               = express();
const router            = express.Router();
const compression       = require('compression');
//const bodyParser        = require('body-parser'); //not in use yet
const config 		    = require('config');
const promise           = require('bluebird');
const logger            = require('./logger').create();
const healthCheckModule = require('./healthCheck').create(config, logger);
/*********************************************************************************/

/**********************************************************************************
Configuration
**********************************************************************************/
const appInfo 		    = require('./package.json');
const port 			    = process.env.PORT || 3000;
/*********************************************************************************/

/**********************************************************************************
End-points
**********************************************************************************/
//Echo
router.get('/', echo);
router.get('/echo', echo);
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

//Health-check end-point
router.get('/healthcheck', healthCheck);
function healthCheck(req, res, next) {

    healthCheckModule.ping()
        .then(function(result) {
            //status: 200, body: json
            res.send(result);     
        })
        .catch(function(err) {           
            //log raw error
            logger.error(err);
            //JSON.stringify unfortunately may fail when error has circular references
            res.status(500).send({ error: err });
        })
        .done(function(){
            //processing has finished
            next();
        });
};
/*********************************************************************************/

/**********************************************************************************
Set up and Start the server
**********************************************************************************/
app
    .use(compression())
    .use('/', router)
    .listen(port);

var msg = 'Starting service using port \'{port}\' and environment \'{environment}\''
			.replace('{port}', port)
			.replace('{environment}', process.env.NODE_ENV)
logger.log(msg);
/********************************************************************************/