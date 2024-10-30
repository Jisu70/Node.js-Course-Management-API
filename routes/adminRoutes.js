const express = require('express');
const { createCourse, createExam, assignCourseToMember } = require('../controllers/adminController');
const { authorizeUser } = require('../middleware/authMiddleware');
const {  authorizeAdmin } = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(authorizeUser);
router.use(authorizeAdmin);

router.post('/courses', createCourse);
router.post('/exams', createExam);
router.post('/assign-course', assignCourseToMember);

module.exports = router;
