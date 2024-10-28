// routes/memberRoutes.js
const express = require('express');
const { getCoursesForMember, getExamsForCourse } = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/courses', getCoursesForMember);
router.get('/courses/:courseId/exams', getExamsForCourse);

module.exports = router;
