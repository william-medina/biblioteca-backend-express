# BIBLIOTECA Backend

## Overview
The backend of **BIBLIOTECA** is a management system designed for a personal library. It provides key functionalities for user authentication and book management, including secure login, collection management, and cover image uploads. Built with Node.js, Express, MySQL, and TypeScript, this system facilitates the organization and control of books in a private library.

## Features

The backend offers the following key functionalities:

### 1. **User Authentication**
   - **Login:** Handles user login, verifying credentials and creating user sessions.
   - **Retrieve User Data:** Provides access to the logged-in user's details.


### 2. **Book Management**
   - **Add New Books:** Allows the addition of new books to the library's collection.
   - **Update Book Information:** Enables updates to details of existing books.
   - **Delete Books:** Supports the removal of books from the library's collection.
   - **Get All Books:** Retrieves a list of all books in the library, optionally sorted by a specified field (e.g., title, author, publisher).
   - **Get Total Book Count:** Provides the total number of books in the collection.
   - **Get Random Books:** Retrieves a random selection of books based on a specified count.
   - **Get Books by Location:** Retrieves books organized by their location within the library.
   - **Search Books:** Searches for books using keywords in titles, authors, publishers, publication year, and ISBN.
   - **Get Book by ISBN:** Retrieves detailed information for a specific book using its ISBN.

### 3. **Book Cover Upload**
   - **File Upload:** The application supports file uploads for book covers using Multer. This allows users to upload images with the following constraints:
     - **File Type:** Only `.jpg` images are allowed.
     - **File Size Limit:** Files must be 5MB or smaller.
   - **How It Works:**
     - **Configuration:** Multer is configured to use memory storage for temporary file handling.
     - **File Validation:** Only `.jpg` files with the MIME type `image/jpeg` are accepted.
     - **Error Handling:** If an uploaded file exceeds the size limit or has an invalid type, the application responds with a specific error message.
     - **Field Name:** The field name for the uploaded cover image in the form must be `cover`.


## Technologies

The **BIBLIOTECA** backend is built using the following modern technologies:

- **Node.js**: JavaScript runtime environment for building server-side logic.
- **Express**: Web framework for Node.js, simplifying API creation and management.
- **TypeScript**: Superset of JavaScript providing static typing and an enhanced development experience.
- **MySQL**: Relational database for storing and managing book and user data.
- **Sequelize**: ORM for MySQL and Node.js, providing a schema-based solution to model your application data.
- **bcrypt**: Library for hashing passwords, ensuring secure user authentication.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWTs) for user authentication.
- **cors**: Middleware to enable Cross-Origin Resource Sharing (CORS) for the backend.
- **dotenv**: Loads environment variables from a `.env` file into `process.env` to manage configuration settings.
- **swagger-jsdoc** & **swagger-ui-express**: Tools for generating and displaying API documentation.

### Development Tools

- **nodemon**: Utility for automatically restarting the server during development.
- **ts-node**: TypeScript execution engine for Node.js, allowing TypeScript code to run directly.
- **typescript**: TypeScript compiler to convert TypeScript code into JavaScript.

These technologies ensure a robust, scalable, and maintainable backend for the Library Management System.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version for optimal stability)
- [MySQL](https://dev.mysql.com/downloads/installer/) (Installed and running locally or use a cloud instance)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/william-medina/biblioteca-backend-express.git
    ```

2. Navigate to the project directory:

    ```bash
    cd library-backend-express
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file:**

    Create a `.env` file in the root of the project directory and fill it with the necessary environment variables. Here is a template you can use:

    ```dotenv
    # Database connection string (MySQL)
    DATABASE_URL=mysql://root@localhost:3306/your_database_name

    # Secret key for JWT authentication
    JWT_SECRET=your_jwt_secret_key

    # Backend URL
    BACKEND_URL=http://localhost:4000

    # Frontend URL
    FRONTEND_URL=http://localhost:5173
    ```

    Replace the placeholder values with your actual configuration details.

5. **Start the server:**

    - **Production mode:**

        To start the server in production mode, use:

        ```bash
        npm start
        ```

    - **Development mode with CORS enabled:**

        To start the server in development mode with CORS enabled, use:

        ```bash
        npm run dev
        ```

    - **Development mode with CORS disabled:**

        To start the server in development mode with CORS disabled (useful for local testing without CORS issues), use:

        ```bash
        npm run dev:no-cors
        ```

## TypeScript

This project is developed using TypeScript, providing static typing and enhanced code quality. TypeScript helps in catching errors early during development and improves maintainability. The code is written in TypeScript and compiled to JavaScript for execution.

## Architecture

The backend for **BIBLIOTECA** follows the **Model-View-Controller (MVC)** architecture:

### 1. **Model**

- **Location:** `src/models`
- **Responsibilities:** Defines data schemas (e.g., Books, Users), manages database operations, and implements business logic.

### 2. **View**

- **Location:** Not applicable directly; API responses act as the view.
- **Responsibilities:** Formats and sends JSON responses for API requests.

### 3. **Controller**

- **Location:** `src/controllers`
- **Responsibilities:** Handles API requests, processes data through models, and sends responses.

## Configuration

The backend configuration is managed through environment variables. The `.env` file should include the following variables:

- `DATABASE_URL`: The connection string for your MySQL database.
- `JWT_SECRET`: Secret key for JSON Web Tokens (JWT) authentication.
- `BACKEND_URL`: The URL where the backend server is hosted.
- `FRONTEND_URL`: The URL where the frontend application is hosted.

## API Documentation

The Swagger API documentation is available at [Swagger UI](http://localhost:4000/api/docs).

**Important:** To view the Swagger documentation, you must run the server with CORS disabled (`npm run dev:no-cors`). This setup is necessary to access the documentation during development.

**Custom Domain/Port:** If your server is running on a different domain or port from `localhost:4000`, you will need to modify the Swagger UI URL accordingly. For example:

- If your server is running on `http://192.168.1.100:3000`, you should access the documentation at `http://192.168.1.100:3000/api/docs`.
- If your server is running on `http://mydomain.com:5000`, you should access the documentation at `http://mydomain.com:5000/api/docs`.

**How to Access:**

1. Determine the domain and port where your server is running.
2. Replace `localhost:4000` in the Swagger UI URL with your server's domain and port.
3. Open your browser and navigate to the updated URL to view the API documentation.

## API Endpoints

### Book Routes

- **Get Total Book Count**
    - **URL:** `/books/count`
    - **Method:** `GET`
    - **Description:** Retrieves the total count of books in the library.

- **Get Random Books**
    - **URL:** `/books/random/{count}`
    - **Method:** `GET`
    - **Description:** Retrieves a random set of books based on the specified count.

- **Get Books by Location**
    - **URL:** `/books/location`
    - **Method:** `GET`
    - **Description:** Retrieves books organized by their location in the library.

- **Get All Books Sorted**
    - **URL:** `/books/{sortBy}`
    - **Method:** `GET`
    - **Description:** Retrieves all books sorted by a specific field (e.g., title, author, publisher).

- **Search Books by Keyword**
    - **URL:** `/books/search/{keyword}`
    - **Method:** `GET`
    - **Description:** Searches for books by a keyword in titles, authors, publishers, publication year, and ISBN.

- **Get Book by ISBN**
    - **URL:** `/books/isbn/{isbn}`
    - **Method:** `GET`
    - **Description:** Retrieves detailed information for a specific book by its ISBN.

- **Add New Book**
    - **URL:** `/books`
    - **Method:** `POST`
    - **Description:** Adds a new book to the library.

- **Update Book Information**
    - **URL:** `/books/{isbn}`
    - **Method:** `PUT`
    - **Description:** Updates the information of a specific book by its ISBN.

- **Delete Book**
    - **URL:** `/books/{isbn}`
    - **Method:** `DELETE`
    - **Description:** Deletes a specific book from the library.

### Auth Routes

- **Login**
    - **URL:** `/auth/login`
    - **Method:** `POST`
    - **Description:** Authenticates a user and returns a JWT token.

- **Get Current User**
    - **URL:** `/auth/me`
    - **Method:** `GET`
    - **Description:** Retrieves the details of the currently authenticated user.
    
### Middleware

- **Middleware: authenticate**
    - **Description:** Secures routes by enforcing a valid JWT token for access.

- **Middleware: handleInputErrors**
    - **Description:** Manages and returns validation errors from request inputs.

- **Middleware: upload**
    - **Description:** Manages file uploads with Multer, configured for handling image files.

- **Middleware: handleMulterErrors**
    - **Description:** Processes and responds to errors related to Multer, including file size limits and invalid file types.


## Author

This backend application for **BIBLIOTECA** is developed and maintained by:

**William Medina**

Thank you for checking out **BIBLIOTECA**!