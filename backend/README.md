# Backend API Docs

## Users

### Register/Authenticate User

POST - /api/auth/signup

**Request format:**

```
{
  "username": "JohnDoe",
  "email": "john@email.com",
  "password": "12345678"
}
```

POST - /api/auth/login

**Request format:**

```
{
  "email": "john@email.com",
  "password": "12345678"
}
```

Both routes will respond with JSON:

**Response format:**

```
{
"token": json-webtoken-here
}
```

### Retrieve/Modify User(s) within database

GET - /api/users

> `GET http://localhost:3000/api/users/`

**Response format:**

```
[
    {
        "posts": [],
        "_id": "5f0e49b2691cc5bb91e88c1a",
        "username": "JohnDoe",
        "email": "john@email.com",
        "password": "$2a$10$H5oRsWyKxx74ynD1etWuQeRq7k.QpaEci.CyhJFYXnq.ALba1zUp6",
        "__v": 0
    },
]
```

GET - /api/users/:id

> `GET http://localhost:3000/api/users/5f0e52be2d7aa9d738cd0a8a`

**Response format:**

```
{
    "posts": [],
    "_id": "5f0e49b2691cc5bb91e88c1a",
    "username": "JohnDoe",
    "email": "john@email.com",
    "password": "$2a$10$H5oRsWyKxx74ynD1etWuQeRq7k.QpaEci.CyhJFYXnq.ALba1zUp6",
    "__v": 0
}
```

PUT - /api/users/:id

**Request format:**
All fields are optional, mongoose will apply changes to any valid fields

> `PUT http://localhost:3000/api/users/5f0e52be2d7aa9d738cd0a8a`

```
"headers": {
  "auth-token": "insert JWT here"
},
"data": {
  "username": "Jonothan Doe",
  "email": "johnnyboy@email.com",
}
```

**Response format:**

```
{
    "posts": [],
    "_id": "5f0e49b2691cc5bb91e88c1a",
    "username": "Jonothan Doe",
    "email": "johnnyboy@email.com",
    "password": "$2a$10$H5oRsWyKxx74ynD1etWuQeRq7k.QpaEci.CyhJFYXnq.ALba1zUp6",
    "__v": 0
}
```

DELETE - /api/users/:id

> `DELETE http://localhost:3000/api/users/5f0e52be2d7aa9d738cd0a8a`

**Request format:**

```
"headers": {
  "auth-token": "insert JWT here"
}
```

**Response format:**

```
{
  "message": "User successfully deleted",
  "id": "Id of deleted user"
}
```
