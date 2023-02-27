## Project Overview

### Tools Used

  1. Node.js
  2. Express.js
  3. MongoDB
  4. Postman
  5. npm Packages - mongoose, bcrypt, jsonwebtoken, multer, nodemon

### Purpose

Making a RESTful API to perform CRUD operations.

#### 1. Base URL

```
http://localhost:3000/
```

#### 2. User Authentication

>Some requests require authentication key which is needed to be passed in headers.

>User signup is mandatory to generate authentication key.

>Authentication keys are valid upto 1 hour once generated.

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
Description : View details of a partiular product with a valid product id
Endpoint : http://localhost:3000/products/123456789
HTTP Method : GET
Auth : Not Required
```

##### 3.4. Update product

```
Description : Update one or more detail of a partiular product with a valid product id
Endpoint : http://localhost:3000/products/123456789
HTTP Method : PATCH
Body :
[
    {
        "propName" : "name", //String
        "value" : "new name" //String
    },
    {
        "propName" : "price", //String
        "value" : "250.0" //Number
    }
]
Auth : Required
```

##### 3.5. Delete product

```
Description : Delete product with a valid product id
Endpoint : http://localhost:3000/products/123456789
HTTP Method : DELETE
Auth : Required
```

#### 4. Orders

>All requests related to orders require authentication key.

##### 4.1. Create order

```
Description : Create an order using a valid product id and quantity
Endpoint : http://localhost:3000/orders
HTTP Method : POST
Body : 
  {
    "productId" : "123456789", //ObjectID
    "quantity" : "1" //Number
}
Auth : Required
```

##### 4.2. View all orders

```
Description : View all orders with count of total orders
Endpoint : http://localhost:3000/orders
HTTP Method : GET
Auth : Required
```

##### 4.3. View product

```
Description : View details of a partiular order with valid order id
Endpoint : http://localhost:3000/orders/123456789
HTTP Method : GET
Auth : Required
```

##### 4.4. Update order

```
Description : Update one or more detail of a partiular order with a valid order id
Endpoint : http://localhost:3000/orders/123456789
HTTP Method : PATCH
Body :
[
    {
        "propName" : "productId", //String
        "value" : "987654321" //ObjectID
    },
    {
        "propName" : "quantity", //String
        "value" : "2" //Number
    }
]
Auth : Required
```

##### 4.5. Delete order

```
Description : Delete order with a valid order id
Endpoint : http://localhost:3000/orders/123456789
HTTP Method : DELETE
Auth : Required
```
