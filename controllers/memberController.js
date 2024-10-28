// controllers/memberController.js
const Course = require('../models/Course');

exports.getCoursesForMember = async (req, res) => {
    try {
        const courses = await Course.find({ assignedMembers: req.user.id }).populate('exams');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExamsForCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('exams');
        res.json(course.exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
