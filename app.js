require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes/index');
const { errorHandler, notFoundMiddleware } = require('./middleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(router);

// 404 error handler
app.use(notFoundMiddleware);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
