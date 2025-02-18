# Simple User Management API

## Objective
This project involves creating a RESTful API for managing users with basic CRUD operations and JWT-based authentication. The system will allow user registration, login, and admin-protected user management.

## Features
- **User Authentication (JWT-based)**  
  - Signup
  - Login
  - JWT Token Generation
  
- **User CRUD Operations (Protected Routes)**  
  - Create User
  - Get All Users
  - Get Single User
  - Update User
  - Delete User
  
- **Security & Middleware**  
  - JWT Authentication Middleware
  - Error Handling Middleware

## Requirements
- **Node.js** and **npm** 
- **PostgreSQL** with **Sequelize**
  
## Getting Started

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd 
   ```

3. Install the project dependencies:
   ```bash
   npm install
   ```

4. Make a `.env` file similar to `.env.example`

5. Setup the `.env` file with your credentials:
   ```bash
    POSTGRES_DB_URL="postgres://<username>:<password>@localhost:5432/<database>"
    PORT = 5000
    JWT_SECRET = "your-secret"
    ```

5. Start the application:
   ```bash
   npm start
   ```

### Endpoints

#### Authentication

- **POST /api/auth/signup**
  - Request body: 
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - Response: Returns a success message.

- **POST /api/auth/login**
  - Request body: 
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - Response: Returns a JWT token.

#### User Management (Protected Routes)

- **POST /api/users** (Create User)
  - A `user` can add a `user`
  - A `admin` can add a `admin` and a `user`
  - Whenever a `user` or `admin` is created, a random password is generated and sent to the user's email.
  - The user can change the password after logging in.
  - Request body:
    ```json
    {
      "name": "Jane Doe",
      "email": "janedoe@example.com",
      "role": "user"
    }
    ```
  - Response: Returns created user.

- **GET /api/users** (Get All Users)
  - Response: Returns a list of all users.

- **GET /api/users/:id** (Get Single User)
  - Response: Returns a single user by ID.

- **PUT /api/users/:id** (Update User)
  - Request body:
    ```json
    {
      "name": "Updated Name",
      "role": "admin"
    }
    ```
  - Response: Returns the updated user.

- **DELETE /api/users/:id** (Delete User)
  - A `admin` only can delete any user.
  - Response: Returns a success message if user is deleted.

### Middleware

- **Auth Middleware**: Protects routes from unauthorized access using JWT authentication.
- **Error Handling Middleware**: Handles errors and sends a response with the error message.
- **Admin Middleware**: Checks if the user is an admin before allowing access to certain routes.

### Bonus Features (Optional)

- **Role-Based Access Control**: Only admins can delete users.
- **Input Validation**: Used **Joi** to validate inputs.
- **Testing**: Add basic unit tests using **Jest**.

## Folder Structure

```
/user-management-api
│
├── /controllers        # Handles the logic for user operations
├── /middlewares        # JWT authentication, error handling and admin middleware
├── /models             # Sequelize models
|── /providers          # Express app and database connection
├── /routes             # API routes
|── /schemas            # Joi validation schemas
|── /config             # Configurations
├── /utils              # Utility functions
├── .env                # Environment variables
├── index.js            # Entry point for the application
└── README.md           # Project documentation
```

## Testing

- Add POSTGRES_DB_URL in `.env` file before running the tests.

  ```bash
  npm run test
  ```
