// routes/memberRoutes.js
const express = require('express');
const { getCoursesForMember, getExamsForCourse } = require('../controllers/memberController');
const { authorizeUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authorizeUser);

router.get('/courses', getCoursesForMember);
router.get('/courses/:courseId/exams', getExamsForCourse);

module.exports = router;
