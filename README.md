# 📚 bookstore-restful-api

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication with OAuth2](#authentication-with-oauth2)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Introduction
The **bookstore-restful-api** is a RESTful API that allows administrators to manage a collection of books. The API provides endpoints to create, update, delete, and view books, with role-based access control to ensure secure management. The application is built using **Node.js**, **Express.js**, and **MongoDB**, and supports CRUD operations, authentication, and authorization.

## 🎬 DEMO
[🌐 Deployment Link](https://basic-nodejs-server-9nqsu5y09-farwamuhibzadas-projects.vercel.app/)

## Features
- ✏️ **CRUD Operations**: Create, read, update, and delete books.
- 🔐 **Role-Based Access Control**: Only administrators can add, update, or delete books.
- 🔑 **User Authentication**: Users authenticate via JSON Web Tokens (JWT).
- **OAuth2 Authentication**: Users can sign in using their Google account via OAuth2 for a seamless login experience.
- ✅ **Data Validation**: Validates required fields for book data.
- ⚠️ **Error Handling**: Provides meaningful error messages and status codes.

## Technologies Used
- **Node.js**: JavaScript runtime for building backend services.
- **Express.js**: Fast, minimalist framework for Node.js.
- **MongoDB**: NoSQL database for storing book records.
- **Mongoose**: ODM for MongoDB, used to create and manage schemas.
- **JSON Web Tokens (JWT)**: For secure user authentication.
- **bcrypt**: For password hashing and verification.

## Getting Started
To set up and run the project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download) (Local or Atlas)
- [Git](https://git-scm.com/)

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/book-management-api.git
    cd book-management-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Refer to the [Environment Variables](#environment-variables) section below for required variables.

4. **Run the server**:
    ```bash
    npm start
    ```

5. **Access the API**:
   The server will start on `http://localhost:3000` by default.

## Project Structure
```plaintext
├── api
│   ├── db.js                    # MongoDB connection setup
│   ├── middleware
│   │   ├── auth.js              # Authentication middleware
│   │   └── roles.js             # Authorization middleware for roles
│   ├── models
│   │   └── Book.js              # Mongoose schema for Book
│   └── routes
│       └── books.js             # Book routes
├── .env                         # Environment variables
├── package.json
└── README.md
```
## Authentication with OAuth2

This project includes OAuth2-based authentication, providing users with the option to sign in using their Google account. The OAuth2 implementation allows for secure and easy authentication, improving user experience by enabling single sign-on.

### How it Works
- **OAuth2 with Google**: Users can sign in to the application using their Google account, eliminating the need for a separate username and password.
- **Secure Authentication**: Using OAuth2 and Google Sign-In ensures that user credentials are handled securely.
- **Token Management**: Once authenticated, the application issues a JSON Web Token (JWT) to manage session state for authenticated routes.

### Environment Variables for OAuth2

To enable OAuth2 with Google, set up the following environment variables in your `.env` file:

```bash
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
JWT_SECRET=<your-jwt-secret>


## Environment Variables
```bash
MONGO_URI = mogodb url;
JWT_SECRET = jwt token;
GOOGLE_CLIENT_ID = your GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET = your GOOGLE_CLIENT_SECRET
```

## API Documentation

### Public Endpoints

- **Get All Books**
  - **URL**: `/books`
  - **Method**: `GET`
  - **Description**: Fetches all available books.

- **Get Book by ID**
  - **URL**: `/books/:id`
  - **Method**: `GET`
  - **Description**: Fetches a book by its unique ID.

### Admin-Only Endpoints

- **Add a New Book**
  - **URL**: `/books`
  - **Method**: `POST`
  - **Authentication**: Required (Admin only)
  - **Body**:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book Description"
    }
    ```

- **Update a Book**
  - **URL**: `/books/:id`
  - **Method**: `PUT`
  - **Authentication**: Required (Admin only)
  - **Body**:
    ```json
    {
      "title": "Updated Title",
      "author": "Updated Author",
      "description": "Updated Description"
    }
    ```

- **Delete a Book**
  - **URL**: `/books/:id`
  - **Method**: `DELETE`
  - **Authentication**: Required (Admin only)

## Middleware

- **Authentication Middleware (`auth.js`)**: Verifies JWT for protected routes.
- **Authorization Middleware (`roles.js`)**: Checks if the user has the required role (e.g., Admin) for specific actions.

## Error Handling

The API provides comprehensive error handling for various issues:

- **Missing Fields**: Validates required fields in the request body.
- **Authorization Errors**: Unauthorized actions return `401` or `403` status codes.
- **Not Found**: Resources not found return a `404` status code.
- **Server Errors**: General server issues return a `500` status code.

## Contributing

Contributions are welcome! If you'd like to help improve this project, please open an issue or submit a pull request with your changes.

### Steps to Contribute

1. **Fork** the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a **Pull Request**.

## Author

 **Farwa Muhibzada 🌟**  

[GitHub Profile](https://github.com/FarwaMuhibZada)

[Linkdin](https://www.linkedin.com/in/farwamohibzada/)

