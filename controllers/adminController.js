// controllers/adminController.js
const Course = require('../models/Course');
const Exam = require('../models/Exam');

exports.createCourse = async (req, res) => {
    const { courseName, description } = req.body;

    try {
        const course = new Course({ courseName, description });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createExam = async (req, res) => {
    const { courseId, examName, totalMarks, passMarks, examDuration, questions } = req.body;

    try {
        const exam = new Exam({ examName, totalMarks, passMarks, examDuration, questions });
        await exam.save();

        const course = await Course.findById(courseId);
        course.exams.push(exam._id);
        await course.save();

        res.status(201).json(exam);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.assignCourseToMember = async (req, res) => {
    const { courseId, memberId } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.assignedMembers.push(memberId);
        await course.save();
        res.json({ message: "Course assigned to member" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
