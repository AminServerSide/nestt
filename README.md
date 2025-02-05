# NestJS E-Commerce Backend

This project is a **modular** e-commerce backend built with **NestJS**, **TypeScript**, and **PostgreSQL** using **Sequelize ORM**. It encompasses essential e-commerce functionalities such as product management, user authentication, cart operations, and order processing.

## Features

- **Modular Architecture**: Organized folder structure for scalability.
- **JWT Authentication**: Secure user authentication mechanism.
- **Product Management**: CRUD operations for products with search and filtering capabilities.
- **Shopping Cart**: Add, remove, and manage cart items.
- **Order Processing**: Handle order creation and invoice generation.
- **PostgreSQL with Sequelize**: Robust relational database management.

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize ORM](https://sequelize.org/)
- [JWT Authentication](https://jwt.io/)

## Getting Started

### Prerequisites

- **Node.js** (>= 18.x)
- **PostgreSQL** (Ensure it's running and accessible)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AminServerSide/nestt.git
   cd nestt


# API Documentation

This document provides detailed information about the API endpoints and how to use them with Postman.

## Table of Contents
1. [User Management](#user-management)
2. [Product Management](#product-management)
3. [Comment System](#comment-system)
4. [Shopping Cart](#shopping-cart)
5. [Wallet System](#wallet-system)
6. [Factor/Invoice](#factor)
7. [Transaction Management](#transaction-management)

## Setup Instructions
1. Download and install [Postman](https://www.postman.com/downloads/)
2. Import the provided collection files into Postman
3. Set up your environment variables (if required)

## User Management
*Details will be added*

## Product Management

The Product API provides endpoints for managing products in the system. Some endpoints require admin privileges.

### Base URL
```
/products
```

### Endpoints

#### 1. Create Product (Admin Only)
```http
POST /products
```

**Headers:**
- `Authorization`: Bearer token (Admin token required)
- `Content-Type`: application/json

**Request Body:**
```json
{
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "stock": 100,
    "image": "image-url",
    "category": "category-name"
}
```

#### 2. Update Product (Admin Only)
```http
PUT /products/:id
```

**Headers:**
- `Authorization`: Bearer token (Admin token required)
- `Content-Type`: application/json

**Parameters:**
- `id`: Product ID (number)

**Request Body:**
```json
{
    "name": "Updated Product Name",
    "description": "Updated Description",
    "price": 149.99,
    "stock": 50,
    "image": "new-image-url",
    "category": "new-category"
}
```

#### 3. Delete Product (Admin Only)
```http
DELETE /products/:id
```

**Headers:**
- `Authorization`: Bearer token (Admin token required)

**Parameters:**
- `id`: Product ID (number)

#### 4. Search Products
```http
GET /products/search
```

**Query Parameters:**
- Any search criteria defined in SearchProductDto

#### 5. Get Product by ID
```http
GET /products/:id
```

**Parameters:**
- `id`: Product ID (number)

#### 6. Get All Products (Admin Only)
```http
GET /products
```

**Headers:**
- `Authorization`: Bearer token (Admin token required)

#### 7. Add Comment to Product
```http
POST /products/comment/:id
```

**Parameters:**
- `id`: Product ID (number)

**Request Body:**
```json
{
    "comment": "Your comment text"
}
```

### Setting up in Postman

1. Create a new collection named "Products API"
2. Add a new request for each endpoint
3. For admin-protected routes:
   - Add the Authorization header with your admin token
   - Format: `Bearer your-token-here`
4. Set the Content-Type header to application/json for POST and PUT requests
5. For requests with parameters:
   - Replace `:id` in the URL with the actual product ID
   - For search, add your query parameters to the URL

### Testing the API

1. Start with creating a product (requires admin token)
2. Use the returned product ID to test other endpoints
3. Test search functionality with different query parameters
4. Ensure you have admin privileges for protected routes

## Comment System

### Comment API Documentation

This document provides instructions for working with the Comment API using Postman.

### Base URL

```
http://yourapiurl.com/api/comments
```

### Endpoints

#### Create a Comment
- **URL**: `/`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "userId": 1,
    "productId": 101,
    "comment": "Great product!",
    "rating": 5
  }
  ```

#### Update a Comment
- **URL**: `/:id`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
- **Body**: 
  ```json
  {
    "comment": "Updated comment text",
    "rating": 4
  }
  ```

#### Delete a Comment
- **URL**: `/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`

#### Get All Comments
- **URL**: `/`
- **Method**: `GET`

#### Get a Single Comment
- **URL**: `/:id`
- **Method**: `GET`

### Authorization

- Some endpoints require an admin token for authorization. Use the `Authorization` header with a Bearer token for these endpoints.

### Postman Collection

You can import the following collection into Postman to quickly test the API endpoints:

[Download Postman Collection](http://yourapiurl.com/path/to/postman_collection.json)

### Notes

- Ensure that the API server is running before making requests.
- Replace `yourapiurl.com` with the actual base URL of your API server.

## Shopping Cart
*Details will be added*

## Wallet System
*Details will be added*

## Factor
*Details will be added*

## Transaction Management
*Details will be added*

## Users API

The Users API handles authentication, profile management, and user-related operations.

---

### 1. Register a New User

**Endpoint:** `POST http://localhost:3000/users/register`

**Description:** Creates a new user account.

**Request Body:**
```json
{
  "username": "admin",
  "firstname": "test1",
  "lastname": "test1",
  "email": "test@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 dm Main St",
  "age": 20,
  "gender": 0
}

```

1. Register a New User
Endpoint: POST http://localhost:3000/users/register
Description: Creates a new user account.
Request Body:
json 
```
{
  "username": "admin",
  "firstname": "test1",
  "lastname": "test1",
  "email": "test@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 dm Main St",
  "age": 20,
  "gender": 0
}
```
Response: Returns user details upon successful registration.
2. User Login
Endpoint: POST http://localhost:3000/users/login
Description: Authenticates the user and returns a JWT token.
Request Body:
json
Copy
Edit
```
{
  "email": "test@example.com",
  "password": "password123"
} 
```
Response: Returns an authentication token.
3. User Logout
Endpoint: POST http://localhost:3000/users/logout
Description: Logs out the user.
Request Body:
json
Copy
Edit
```
{
  "userId": 8
}

```
Response: Confirms the user has logged out.
4. Edit User Profile
Endpoint: PUT http://localhost:3000/users/edit-profile
Description: Updates the user's profile details.
Request Body:
json
Copy
Edit
```
{
  "userId": 8
}
```
Response: Returns the updated user profile.
5. Reset Password
Endpoint: POST http://localhost:3000/users/reset-password
Description: Changes the user's password.
Request Body:
json
Copy
Edit
```
{
  "oldPassword": "newpassword123",
  "newPassword": "newpassword1234"
}
```
Response: Confirms password change.
6. Forgot Password
Endpoint: POST http://localhost:3000/users/forgot-password
Description: Resets the password using a verification code.
Request Body:
json
Copy
Edit
```
{
  "email": "mmmdd@example.com",
  "verificationCode": "123456",
  "newPassword": "newpassword444"
}
```
Response: Confirms password reset.
7. Get All Users
```
Endpoint: GET http://localhost:3000/users
```
Description: Retrieves a list of all registered users.
Response: Returns an array of user objects.
8. Delete a User
```
Endpoint: DELETE http://localhost:3000/users/:userId
```
Description: Removes a user from the system.
Response: Confirms user deletion.
