# User Management API

## Overview
This is a Node.js-based REST API for managing users, built using Express, MongoDB, and Mongoose. It allows for user creation, retrieval, and management with data validation.

## Features
- User creation with validation
- Unique email enforcement
- Express.js for API routing
- MongoDB as the database
- Mongoose as the ODM
- Body-parser for request handling

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Body-parser**

## API Endpoints
### Create a User
- **URL:** `/user/save`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass",
    "mobile": "1234567890",
    "address": "123 Main St",
    "city": "New York",
    "gender": "Male"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User Created."
  }
  ```

## Folder Structure
```
user-management-api/
│── models/
│   ├── connection.js
│   ├── user.model.js
│── routes/
│   ├── user.router.js
│── controllers/
│   ├── user.controller.js
│── index.js
│── package.json
│── README.md
```

## Future Enhancements
- This project is constantly evolving as new technologies and best practices are learned. More features and improvements will be added over time to make it more robust and efficient.
