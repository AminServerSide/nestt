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

### Cart API Documentation

### Base URL

```
http://yourapiurl.com/api/carts
```

### Endpoints

#### Create a Cart
- **URL**: `/:userId`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Parameters**: Optional `factorId`

#### Add Product to Cart
- **URL**: `/:cartId/add-product/:productId`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "quantity": 2
  }
  ```

#### Get Cart
- **URL**: `/:cartId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

#### Get Carts by User
- **URL**: `/user/:userId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

#### Remove Product from Cart
- **URL**: `/:cartId/remove-product/:productId`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`

### Setting up in Postman

1. Create a new collection named "Cart API"
2. Add a new request for each endpoint
3. For protected routes:
   - Add the Authorization header with your token
   - Format: `Bearer your-token-here`
4. Set the Content-Type header to application/json for POST requests
5. For requests with parameters:
   - Replace `:id` in the URL with the actual cart ID or product ID

### Testing the API

1. Start with creating a cart
2. Use the returned cart ID to test other endpoints
3. Test adding and removing products from the cart
4. Ensure you have the required token for protected routes

## Wallet System

### Wallet API Documentation

### Base URL

```
http://yourapiurl.com/api/wallets
```

### Endpoints

#### Create Wallet
- **URL**: `/`
- **Method**: `POST`
- **Body**: `CreateWalletDto`

#### Get Wallet by ID
- **URL**: `/:id`
- **Method**: `GET`

#### Update Wallet
- **URL**: `/:id`
- **Method**: `PUT`
- **Body**: `UpdateWalletDto`

#### Delete Wallet
- **URL**: `/:id`
- **Method**: `DELETE`

#### Add Funds
- **URL**: `/:id/add-funds`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "amount": "100"
  }
  ```

#### Deduct Funds
- **URL**: `/:id/deduct-funds`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "amount": "50"
  }
  ```

#### Get Wallet by User ID
- **URL**: `/user/:userId`
- **Method**: `GET`

### Setting up in Postman

1. Create a new collection named "Wallet API"
2. Add a new request for each endpoint
3. For protected routes:
   - Add the Authorization header with your token
   - Format: `Bearer your-token-here`
4. Set the Content-Type header to application/json for POST requests
5. For requests with parameters:
   - Replace `:id` in the URL with the actual wallet ID or user ID

### Testing the API

1. Start with creating a wallet
2. Use the returned wallet ID to test other endpoints
3. Test adding and deducting funds from the wallet
4. Ensure you have the required token for protected routes

## Factor

### Factor API Documentation

### Base URL

```
http://yourapiurl.com/api/factors
```

### Endpoints

#### Create a Factor
- **URL**: `/`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: `CreateFactorDto`

#### Get User Factors
- **URL**: `/user/:userId`
- **Method**: `GET`

#### Get Factor by ID
- **URL**: `/:id`
- **Method**: `GET`

#### Update Factor Status
- **URL**: `/:id/status`
- **Method**: `PUT`
- **Body**: `UpdateFactorStatusDto`

#### Apply Discount
- **URL**: `/:id/discount`
- **Method**: `POST`
- **Body**: `ApplyDiscountDto`

#### Checkout Factor
- **URL**: `/:id/checkout`
- **Method**: `POST`
- **Body**: `CheckoutFactorDto`

### Setting up in Postman

1. Create a new collection named "Factor API"
2. Add a new request for each endpoint
3. For protected routes:
   - Add the Authorization header with your token
   - Format: `Bearer your-token-here`
4. Set the Content-Type header to application/json for POST requests
5. For requests with parameters:
   - Replace `:id` in the URL with the actual factor ID or user ID

### Testing the API

1. Start with creating a factor
2. Use the returned factor ID to test other endpoints
3. Test updating the factor status and applying discounts
4. Ensure you have the required token for protected routes

## Transaction Management
*Details will be added*

## E-Commerce API Documentation

### Base URL

```
http://yourapiurl.com/api/e-commerce
```

### Endpoints

*Details will be added*

## Payment API Documentation

### Base URL

```
http://yourapiurl.com/api/payment
```

### Endpoints

*Details will be added*

## Product API Documentation

### Base URL

```
http://yourapiurl.com/api/product
```

### Endpoints

*Details will be added*

## Transaction API Documentation

### Base URL

```
http://yourapiurl.com/api/transaction
```

### Endpoints

*Details will be added*

## Users API

### Users API Documentation

### Base URL

```
http://yourapiurl.com/api/users
```

### Endpoints

#### Register a New User
- **URL**: `/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
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

#### User Login
- **URL**: `/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

#### User Logout
- **URL**: `/logout`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "userId": 8
  }
  ```

#### Edit User Profile
- **URL**: `/edit-profile`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "userId": 8
  }
  ```

#### Reset Password
- **URL**: `/reset-password`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "oldPassword": "newpassword123",
    "newPassword": "newpassword1234"
  }
  ```

#### Forgot Password
- **URL**: `/forgot-password`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "email": "mmmdd@example.com",
    "verificationCode": "123456",
    "newPassword": "newpassword444"
  }
  ```

#### Get All Users
- **URL**: `/`
- **Method**: `GET`

#### Delete a User
- **URL**: `/:userId`
- **Method**: `DELETE`

### Setting up in Postman

1. Create a new collection named "Users API"
2. Add a new request for each endpoint
3. Set the Content-Type header to application/json for POST requests
4. For requests with parameters:
   - Replace `:id` in the URL with the actual user ID

### Testing the API

1. Start with registering a new user
2. Use the returned user ID to test other endpoints
3. Ensure the API server is running before making requests
4. Replace `yourapiurl.com` with the actual base URL of your API server.
