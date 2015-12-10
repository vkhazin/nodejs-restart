/**********************************************************************************
Dependencies
**********************************************************************************/
var uuid			= require('uuid');
var xmlParser       = require('xml2json');

/**********************************************************************************
Constants
**********************************************************************************/
var routePrefix                     = '/v1';
var headerXRequestId	            = 'x-request-id';
var headerXDeviceType	            = 'x-device-type';
/*********************************************************************************/

exports.create =  function (logger) {

    return (function () {

        return {
            getXRequestId: function (req) {
                return req.headers[headerXRequestId] || uuid.v4();
            },            
            getXDeviceType: function (req) {
                return req.headers[headerXDeviceType];
            },
            xml2Json: function(xml){
                return JSON.parse(xmlParser.toJson(xml));
            }
        };
    }());
};