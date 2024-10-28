// routes/adminRoutes.js
const express = require('express');
const { createCourse, createExam, assignCourseToMember } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.post('/courses', createCourse);
router.post('/exams', createExam);
router.post('/assign-course', assignCourseToMember);

module.exports = router;
