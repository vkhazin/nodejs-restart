var promise			= require('bluebird');

exports.create =  function (logger) {

    return (function () {

        return {
            authorize: function (id) {
                return promise.resolve(true);;
            },  
        };

    }());
};