# Seed Project for Restful Service using Restify #

# Overview #
Fast tack creating end-point using restify

# End-Points #

## Echo ##

### Request ###

GET: /  
GET: /echo  
GET: /v1/  
GET: /v1/echo  

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

GET: /v1/helloWorld/vlad

### Response ###

Status: 200  
```
{
    msg: "hello vlad!"
}
```