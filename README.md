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
    "email" : "example@example.com", //String
    "password" : "example@123" //String
  }
Auth : Not Required
```

##### 2.2. User login and authentication token generation

```
Description : Generate authetication token by logging in for existing users
Endpoint : http://localhost:3000/user/login
HTTP Method : GET
Body : 
  {
    "email" : "example@example.com", //String
    "password" : "example@123" //String
  }
Auth : Not Required
```

##### 2.3. Delete user 

```
Description : Delete user using user id
Endpoint : http://localhost:3000/user/123456789
HTTP Method : DELETE
Auth : Not Required
```

#### 3. Product

##### 3.1. Create product

```
Description : Create new product 
Endpoint : http://localhost:3000/products
HTTP Method : POST
Body : form-data

  | KEY           |  VALUE        | TYPE          |
  | ------------- | ------------- | ------------- |
  | name          | example_prod  | String        |
  | price         | 100.0         | Number        |
  | productImage  | image.png     | jpeg/png      |

Auth : Required
```

##### 3.2. View all products

```
Description : View all products with count of total products
Endpoint : http://localhost:3000/products
HTTP Method : GET
Auth : Not Required
```

##### 3.3. View product

```
Description : View details of a partiular product with product id
Endpoint : http://localhost:3000/products/123456789
HTTP Method : GET
Auth : Not Required
```

##### 3.4. Update product

```
Description : Update one or more detail of ona partiular product with product id
Endpoint : http://localhost:3000/products/123456789
HTTP Method : PATCH
Body :
[
    {
        "propName" : "name",
        "value" : "new name"
    },
    {
        "propName" : "price",
        "value" : "250.0"
    }
]
Auth : Required
```

##### 3.5. Delete product

```
Description : Delete  product with product id
Endpoint : http://localhost:3000/products/123456789
HTTP Method : DELETE
Auth : Required
```