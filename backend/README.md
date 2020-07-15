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

### Get User from database

GET - /api/users
