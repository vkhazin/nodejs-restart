# Rogers Authentication/Authorization Service #

# Overview #
Integrate shomi with rogers direct api for authentication and authorization purposes.
By-pass Adobe Pass & Clearleap or any of their equivalents.

# End-Points #

## AuthCZ ##

### Request ###

POST: /authc  
```
{
	"username": "vlad.khazin@shomi.com",
	"password": "sHomi2016"
}
```

### Response-Success ###

Status: 200  
```
{
	"id": "60b9c0d8-a8d9-4d11-a124-23ef1c965d50",
	"email": "vlad.khazin@shomi.com",
    "isAuthenticated": true,
    "isAuthorized": true
}
```

### Response-Failure-AuthC ###

Status: 401 - Unauthorized
```
{
    "isAuthenticated": false,
}
```

### Response-Failure-AuthZ ###

Status: 403 - Forbidden
```
{
	"id": "60b9c0d8-a8d9-4d11-a124-23ef1c965d50",
    "email": "vlad.khazin@shomi.com",
    "isAuthenticated": true,
    "isAuthorized": false
}
```


### Response-Failure-Bad Request ###

Status: 400 - Bad Request
```
{
	"message": "Missing username and/or password"
}
```

## Authorization ##

### Request ###

GET: /authz/:id  

### Response-Success ###

Status: 200  
```
{
   "isAuthorized": true
}
```

Status: 403 - Forbidden
```
{
    "isAuthorized": false
}
```
