const express = require('express');
const router = express.Router();
const { getCoursesForMember, getExamsForCourse, submitExamAnswer, getResult } = require('../controllers/memberController');
const { authorizeUser } = require('../middleware/authMiddleware');
const { validationHandler } = require('../middleware/validationHandler');
const { submitExamAnswerValidators, getExamsForCourseValidators, getExamResultValidators } = require("../utils/validators");
const { authorizeMember } = require('../middleware/roleMiddleware');

router.use(authorizeUser);
router.use(authorizeMember);

// Post routes
router.post('/exams/:examId/submit', submitExamAnswerValidators, validationHandler, submitExamAnswer);

// Get routes
router.get('/courses', getCoursesForMember);
router.get('/courses/:courseId/exams', getExamsForCourseValidators, validationHandler, getExamsForCourse);
router.get('/result/:examId', getExamResultValidators, validationHandler, getResult);

module.exports = router;
