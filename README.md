# Seed Project for Restful Service using Restify #

# Overview #
Fast tack creating end-point using restify from the linkedin article:  
https://www.linkedin.com/pulse/from-0-over-500-reqsec-half-day-vlad-khazin

# Setup #
* Install node.js
* Clone project from terminal window: git clone https://github.com/vkhazin/restify-seed.git
* Install dependencies from terminal window: npm install
* Run from command window: node app.js

# End-Points #

## Echo ##

### Request ###

GET: http://localhost:3000/  
GET: http://localhost:3000/echo  
GET: http://localhost:3000/v1/  
GET: http://localhost:3000/v1/echo  

### Response ###

Status: 200  
```
{
    name: "restify-seed",
    version: "1.0.0",
    description: "from 0 to 500 req/sec",
    author: "Vlad Khazin <vladimir.khazin@icssolutions.ca>",
    node: "v4.2.2"
}
```

## helloWorld ##

### Request ###

GET: http://localhost:3000/v1/helloWorld/vlad

### Response ###

Status: 200  
```
{
    msg: "hello vlad!"
}
```