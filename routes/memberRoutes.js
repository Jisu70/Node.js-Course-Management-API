// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const { getCoursesForMember, getExamsForCourse, submitExamAnswer } = require('../controllers/memberController');
const { authorizeUser } = require('../middleware/authMiddleware');
const { validationHandler } = require('../middleware/validationHandler');
const { submitExamAnswerValidators } = require("../utils/validators");// Auth middleware
router.use(authorizeUser);
// 
router.get('/courses', getCoursesForMember);
router.get('/courses/:courseId/exams', getExamsForCourse);
router.post('/exams/:examId/submit', submitExamAnswerValidators, validationHandler, submitExamAnswer);

module.exports = router;
