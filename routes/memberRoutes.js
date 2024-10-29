// routes/memberRoutes.js
const express = require('express');
const { getCoursesForMember, getExamsForCourse, submitExamAnswer } = require('../controllers/memberController');
const { authorizeUser } = require('../middleware/authMiddleware');
const router = express.Router();

// Auth middleware
router.use(authorizeUser);

router.get('/courses', getCoursesForMember);
router.get('/courses/:courseId/exams', getExamsForCourse);
router.post('/exams/:examId/submit', submitExamAnswer);

module.exports = router;
