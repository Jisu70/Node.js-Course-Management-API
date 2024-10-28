// routes/authRoutes.js
const express = require('express');
const router = express.Router(); 
const { registerAdmin, loginAdmin, registerMember, loginMember } = require('../controllers/authController');
const { validationHandler } = require('../middleware/validationHandler');
const { adminSignupValidators, memberSignupValidators } = require("../utils/validators");

// Admin routes
router.post('/admin/register', adminSignupValidators, validationHandler, registerAdmin);
router.post('/admin/login', loginAdmin);

// Member routes
router.post('/member/register', memberSignupValidators, validationHandler, registerMember);
router.post('/member/login', loginMember);

module.exports = router;
