# CRUD API with Authentication

This is a basic CRUD API backend project built with authentication to manage data securely. The API is implemented using **Node.js**, **Express.js**, and **MongoDB**. It provides endpoints for creating, reading, updating, and deleting records, along with user authentication using **JWT (JSON Web Tokens)**.

## Features

- **User Authentication**:
  - Register new users
  - Login for existing users
  - JWT-based token generation and verification
- **CRUD Operations**:
  - Create new data records
  - Read existing data
  - Update specific data entries
  - Delete data entries
- Secure API routes with authentication middleware

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14+)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://www.npmjs.com/package/express)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Postman](https://www.postman.com/) or any API testing tool

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```bash
   cd crud_api_app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following:
   ```bash
   PORT=3000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```
2. Replace your-mongodb-connection-string with your MongoDB URI and your-secret-key with a strong secret key for JWT.

## Usage

### Start the server:
```bash
node server3.js
```
Access the API at http://localhost:3000.
