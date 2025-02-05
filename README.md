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



# API Documentation(how to use)

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

