
# Fort Mindz Assignment


## Table of Contents

- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)

## Setup


1. Install dependencies by running:

   ```bash
   npm install
   ```

## environment-variables

1. Set up environment variables by creating a `.env` a reference .env.copy for reference.
```plaintext
MONGO_CONNECTION_STRING=mongodb://localhost:****  # Add your MongoDB connection string without trailing '/'
JWT_SECRET=your_jwt_secret                        # Secret key for JWT token generation
PORT=5000                                         # Define the port to run the server
```
## scripts

1. Run the project:
   - Development mode: `npm run dev` -- Run with nodemon
   - Production mode: `npm run prod` -- Run with node


> **Note**: The MongoDB database will automatically be created upon connection with the hardcoded name `fort-mindz-assignment`.


## API Documentation

1. **Home Route** - Check if the project is running correctly:
   - **GET** `http://localhost:5000/`
   - Expected response:
     ```json
     {
       "success": false,
       "message": "Not Found"
     }
     ```

2. **Database Connection Check** - Verify if the MongoDB connection is successful:
   - **GET** `http://localhost:5000/check-database-connection`
   - Expected response: `"Database connection successful!"`

- Swagger Documentation : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Technologies Used

- **Express** - Web framework for Node.js.
- **Mongoose** - MongoDB object modeling tool.
- **JWT (jsonwebtoken)** - Authentication via JSON Web Tokens.
- **bcryptjs** - Password hashing library.
- **dotenv** - Environment variable management.
- **express-validator** - Data validation for Express.
- **Swagger** - API documentation generator.

