const { UnhandledError, NotFoundError, UnauthorizedError, BadrequestError } = require("../libs/errorLib");
const { sendSuccess } = require("../libs/responseLib");
const Course = require('../models/Course');
const Exam = require('../models/Exam');

/**
 * This function is used to create a course
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.createCourse = async (req, res, next) => {
    const { courseName, description } = req.body;

    try {
        const course = new Course({ courseName, description });
        await course.save();
        return sendSuccess(res, course, 'Course created successfully', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while creating course.'));
    }
};

/**
 * This function is used to create an exam and assign it to a course
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.createExam = async (req, res, next) => {
    const { courseId, examName, totalMarks, passMarks, examDuration, questions } = req.body;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return next(new NotFoundError('Course not found'));
        }
        const exam = new Exam({ examName, totalMarks, passMarks, examDuration, questions });
        await exam.save();

        course.exams.push(exam._id);
        await course.save();

        return sendSuccess(res, exam, 'Exam created successfully', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while creating exam.'));
    }
};

/**
 * This function is used to assign a course to a member
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.assignCourseToMember = async (req, res, next) => {
    const { courseId, memberId } = req.body;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return next(new NotFoundError('Course not found'));
        }

        course.assignedMembers.push(memberId);
        await course.save();
        return sendSuccess(res, [], 'Course assigned to member', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while assigning course to member.'));
    }
};
