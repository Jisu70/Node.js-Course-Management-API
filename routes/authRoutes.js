const express = require('express');
const router = express.Router(); 
const { registerAdmin, login } = require('../controllers/authController');
const { validationHandler } = require('../middleware/validationHandler');
const { signupValidators } = require("../utils/validators");

// Admin routes
router.post('/admin/register', signupValidators, validationHandler, registerAdmin);

// Common Login
router.post('/login', login)

module.exports = router;
