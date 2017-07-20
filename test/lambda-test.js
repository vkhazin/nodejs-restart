const lambda		    = require('../lambda');

const echoEvent = {
  resource: "/",
  path: "/",
  httpMethod: "GET",
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "BS",
    DNT: "1",
    Host: "oqrzdhckn8.execute-api.us-east-2.amazonaws.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
    "Via": "1.1 85da55ad6484d43ed71e004ad6f0496f.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "vUWr64h90lzJf8sRDnYC7oIJC3MJEYNy9HPxW1X1UtgTaICkcGNuig==",
    "X-Amzn-Trace-Id": "Root=1-5970c7dd-1ebf6ec97c53a8f8519b39a1",
    "X-Forwarded-For": "108.60.230.202, 54.239.140.75",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    path: "/poc/",
    accountId: "811322200214",
    resourceId: "ag8lo7kr1e",
    stage: "poc",
    requestId: "8c44458a-6d5d-11e7-998a-e98ca284c3df",
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      apiKey: "",
      sourceIp: "108.60.230.202",
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
      user: null
    },
    resourcePath: "/",
    httpMethod: "GET",
    apiId: "oqrzdhckn8"
  },
  body: null,
  isBase64Encoded: false
};

const healthCheckEvent = {
  resource: "/{proxy+}",
  path: "/healthcheck",
  httpMethod: "GET",
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "BS",
    DNT: "1",
    Host: "oqrzdhckn8.execute-api.us-east-2.amazonaws.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
    "Via": "1.1 85da55ad6484d43ed71e004ad6f0496f.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "vUWr64h90lzJf8sRDnYC7oIJC3MJEYNy9HPxW1X1UtgTaICkcGNuig==",
    "X-Amzn-Trace-Id": "Root=1-5970c7dd-1ebf6ec97c53a8f8519b39a1",
    "X-Forwarded-For": "108.60.230.202, 54.239.140.75",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  queryStringParameters: null,
  pathParameters: {
    proxy: "healthcheck"
  },
  stageVariables: null,
  requestContext: {
    path: "/poc/healthcheck",
    accountId: "811322200214",
    resourceId: "9ivgzm",
    stage: "poc",
    requestId: "de39d72e-6d60-11e7-bcb7-2f6f274f7087",
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      apiKey: "",
      sourceIp: "108.60.230.202",
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
      user: null
    },
    resourcePath: "/{proxy+}",
    httpMethod: "GET",
    apiId: "oqrzdhckn8"
  },
  body: null,
  isBase64Encoded: false
};

const callback = function(err, result){};

describe('lambda', function() {
  
	describe('#echo', function() {
		it('Should return echo info', function(done) {
			lambda.handler(echoEvent, null, callback)
				.then(function(response){
          if (response.statusCode !== 200) {
						throw new Error('Response did meet expectations');
					}
				})
				.done(function(){
					done();
				});
		});
	});

	describe('#healthCheck-200', function() {
		it('Should return 200', function(done) {
			lambda.handler(healthCheckEvent, null, callback)
				.then(function(response){
          if (response.statusCode !== 200) {
						throw new Error('Response did meet expectations');
					}
				})
				.done(function(){
					done();
				});
		});
	});

	describe('#healthCheck-500', function() {
		it('Should return 500 after 3 calls', function(done) {
      lambda.handler(healthCheckEvent, null, callback)
        .then(response => {
          lambda.handler(healthCheckEvent, null, callback)
            .then(response => {
               lambda.handler(healthCheckEvent, null, callback)
                .then(response => {
                  lambda.handler(healthCheckEvent, null, callback)
                    .then(function(response){
                      if (response.statusCode !== 500) {
                        throw new Error('Response did meet expectations');
                      }
                    })
                    .done(function(){
                      done();
                    });                 
               })
          })
      });      
		});
	});
  
});