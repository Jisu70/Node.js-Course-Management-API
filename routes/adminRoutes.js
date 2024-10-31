const express = require('express');
const { createCourse, createExam, assignCourseToMember, registerMember, getAllMembers, getAllCourses, getAllExams } = require('../controllers/adminController');
const { authorizeUser } = require('../middleware/authMiddleware');
const {  authorizeAdmin } = require('../middleware/roleMiddleware');
const { validationHandler } = require('../middleware/validationHandler');
const { signupValidators, createCourseValidators, createExamValidators, assignCourseValidators } = require("../utils/validators");
const router = express.Router();

// Middleware
router.use(authorizeUser);
router.use(authorizeAdmin);

// Post routes
router.post('/members', signupValidators, validationHandler, registerMember);
router.post('/courses', createCourseValidators, validationHandler, createCourse);
router.post('/exams', createExamValidators, validationHandler, createExam);
router.post('/assign-course', assignCourseValidators, validationHandler, assignCourseToMember);

// Get routes
router.get('/members', getAllMembers);
router.get('/courses', getAllCourses);
router.get('/exams', getAllExams);

module.exports = router;
