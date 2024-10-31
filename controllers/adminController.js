const { UnhandledError, NotFoundError, BadrequestError } = require("../libs/errorLib");
const { sendSuccess } = require("../libs/responseLib");
const bcrypt = require('bcryptjs');
const Course = require('../models/Course');
const Exam = require('../models/Exam');
const User = require('../models/User');
const Result = require('../models/Result');
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

        if (course.assignedMembers.includes(memberId)) {
            return next(new BadrequestError('Course already assigned to member.'));
        }
        const isMember = await User.findOne({ _id: memberId, role: 'member' });

        if (!isMember) {
            return next(new NotFoundError('Member not found'));
        }
        course.assignedMembers.push(memberId);
        await course.save();
        return sendSuccess(res, [], 'Course assigned to member', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while assigning course to member.'));
    }
};
/**
 * This function is used to register a member and only admins can register members
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.registerMember = async (req, res, next) => {
    const { name, email, phone, gender, role, password } = req.body;

    try {
        if (role !== 'member') {
            return next(new BadrequestError('Invalid role.'));
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const member = new User({ name, email, gender, phone, role, password: hashedPassword });
        await member.save();
        return sendSuccess(res, { memberId : member._id}, 'Member registered successfully', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while creating member.'));
    }
};
/**
 * This function is used to get all members
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getAllMembers = async (req, res, next) => {
    try {
        const members = await User.find({ role: 'member' }).select('-password');
        return sendSuccess(res, members, 'Members fetched successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching members.'));
    }
}
/**
 * This function is used to get all courses
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        return sendSuccess(res, courses, 'Courses fetched successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching courses.'));
    }
}
/**
 * This function is used to get all exams
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getAllExams = async (req, res, next) => {
    try {
        const exams = await Exam.find();
        return sendSuccess(res, exams, 'Exams fetched successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching exams.'));
    }
}
/**
 * This function is used to get exam result by memberId and examId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getExamResult = async (req, res, next) => {
    const memberId = req.params.memberId;
    const examId = req.params.examId;

    try {
        const results = await Result.find({ memberId, examId });
        if (!results || results.length === 0) {
            return next(new NotFoundError('No results found'));
        }
        return sendSuccess(res, results, 'Results fetched successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching results.'));
    }
}