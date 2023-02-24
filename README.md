## Project Overview

### Tools Used

  1. Node.js
  2. Express.js
  3. MongoDB
  4. Postman
  5. npm Packages - mongoose, bcrypt, jsonwebtoken, multer

### Purpose

Making a RESTful API to perform CRUD operations.

#### 1. Base URL

```
http://localhost:3000/
```

#### 2. User Authentication

##### 2.1. User signup

```
Description : Sign up using email and password
Endpoint : http://localhost:3000/user/signup
HTTP Method : POST
Body : 
  {
    "email" : "example@example.com",
    "password" : "example@123"
  }
Auth : Not Required
```

##### 2.2. User login and authentication token generation.

```
Description : Generate authetication token by logging in for existing users
Endpoint : http://localhost:3000/user/login
HTTP Method : GET
Body : 
  {
    "email" : "example@example.com",
    "password" : "example@123"
  }
Auth : Not Required
```
