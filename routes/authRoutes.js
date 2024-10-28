// routes/authRoutes.js
const express = require('express');
const { registerAdmin, loginAdmin, registerMember, loginMember } = require('../controllers/authController');
const router = express.Router();
const {validationHandler } = require('../middleware/validationHandler');
const { adminSignupValidators, memberSignupValidators } = require("../utils/validators");


router.post('/admin/register', adminSignupValidators, validationHandler, registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/member/register', memberSignupValidators, validationHandler, registerMember);
router.post('/member/login', loginMember);

module.exports = router;
