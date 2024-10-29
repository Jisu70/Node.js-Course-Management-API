// routes/authRoutes.js
const express = require('express');
const router = express.Router(); 
const { registerAdmin,  registerMember,  login } = require('../controllers/authController');
const { validationHandler } = require('../middleware/validationHandler');
const { signupValidators } = require("../utils/validators");
const {  authorizeAdmin } = require('../middleware/roleMiddleware');
const { authorizeUser } = require('../middleware/authMiddleware');

// Admin routes
router.post('/admin/register', signupValidators, validationHandler, registerAdmin);

// Common Login
router.post('/login', login)

// From here it is admin protected routes
router.use(authorizeUser);
router.use(authorizeAdmin);

router.post('/admin/member/register', signupValidators, validationHandler, registerMember);

module.exports = router;
