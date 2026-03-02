# User API Spec

## Register User API

Endpoint: POST /api/users

- Request Body:
    ```json
    {
    "username": "annas",
    "password": "annas",
    "name":"Annas"
    }
    ```

- Response Body Success:

    ```json
    {
        "data": {
            "username": "annas",
            "name": "Annas"
        }
    }
    ```

- Response Body Error:

    ```json
    {
        "errors": "User Already Registered"
    }
    ```

## Login User API

Endpoint: POST /api/users/login

- Request Body:

    ```json
    {
        "username": "annas",
        "password": "annas",
    }
    ```

- Response Body Success:

    ```json
    {
        "data": {
            "token": "uuid-token"
        }
    }
    ```

- Response Body Error:

    ```json
    {
        "errors": "Username / Password wrong!"
    }
    ```

## Update User API

Endpoint: PATCH /api/users/current

Headers: 
- Authorization: token

- Request Body: 
  
  ```json
    {
        "name": "Annas", // optional
        "password": "annas", // optional
    }
    ```

- Response Body Success:
  
    ```json
    {
        "data": {
            "username": "annas",
            "name": "Annas"
        }
    }
    ```

- Response Body Error: 
  
    ```json
    {
        "errors": "Name length max. 100 char"
    }
    ```

## Get User API

Endpoint: GET /api/users/current

Headers: 
- Authorization: token

- Response Body Success:
    ```json
    {
        "data": {
            "username": "annas",
            "name": "Annas"
        }
    }
    ```

- Response Body Error: 
    ```json
    {
        "errors": "Unauthorized"
    }
    ```

## Logout User API

Endpoint: DELETE /api/users/logout

Headers: 
- Authorization: token

- Response Body Success:
  
    ```json
    {
        "data": "OK"
    }
    ```

- Response Body Error: 
  
    ```json
    {
        "errors": "Unauthorized"
    }
    ```