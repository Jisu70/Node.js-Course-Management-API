const express = require('express');
const { createCourse, createExam, assignCourseToMember, registerMember, getAllMembers, getAllCourses, getAllExams } = require('../controllers/adminController');
const { authorizeUser } = require('../middleware/authMiddleware');
const {  authorizeAdmin } = require('../middleware/roleMiddleware');
const { validationHandler } = require('../middleware/validationHandler');
const { signupValidators } = require("../utils/validators");
const router = express.Router();

router.use(authorizeUser);
router.use(authorizeAdmin);

router.post('/members', signupValidators, validationHandler, registerMember);
router.get('/members', getAllMembers);
router.post('/courses', createCourse);
router.post('/exams', createExam);
router.post('/assign-course', assignCourseToMember);
router.get('/courses', getAllCourses);
router.get('/exams', getAllExams);
module.exports = router;
