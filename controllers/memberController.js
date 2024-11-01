
const Course = require('../models/Course');
const Exam = require('../models/Exam');
const Result = require('../models/Result');
const { UnhandledError, NotFoundError, UnauthorizedError, BadrequestError } = require("../libs/errorLib");
const { sendSuccess } = require("../libs/responseLib");

/**
 * This function is used to get all courses that assigned to a member
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getCoursesForMember = async (req, res, next) => {
    try {
        const courses = await Course.find({ assignedMembers: req.user.id }).populate('exams');
        if (!courses) {
            return next(new NotFoundError('No courses found'));
        }
        // Modified the response to remove answer
        courses.forEach(course => {
            course.exams.forEach(exam => {
                exam.questions.forEach(question => {
                    question.options.forEach(option => {
                        option.isCorrect = null;
                    });
                });
            });
        });
        return sendSuccess(res, courses, 'Courses fetched successfully', 200);

    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching courses.'));
    }
};

/**
 * This function is used to get all exams for a course by courseId
 * @param {*} req 
 * @param {*} res 
 */
exports.getExamsForCourse = async (req, res, next) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('exams');

        if (!course) {
            return next(new NotFoundError('Course not found'));
        }
        // Modified the response to remove answer
        course.exams.forEach(exam => {
            exam.questions.forEach(question => {
                question.options.forEach(option => {
                    option.isCorrect = null;
                });
            });
        });
        return sendSuccess(res, course.exams, 'Exams fetched successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching courses.'));
    }
};

/**
 * This function is used to submit an exam answer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.submitExamAnswer = async (req, res, next) => {
    try {
        const { courseId, examId } = req.params;
        const { answers } = req.body;
        const memberId = req.user.id;

        // Check if already submitted
        const isAlreadySubmitted = await Result.findOne({ courseId, memberId, examId });
        if (isAlreadySubmitted) {
            return next(new BadrequestError('Already submitted'));
        }
        // Fetch the exam details
        const exam = await Exam.findById(examId);
        if (!exam) {
            return next(new NotFoundError('Exam not found'));
        }
        // Find the course details
        const isValidCourse = await Course.find({ _id: courseId, assignedMembers: memberId, exams: examId });
        if (!isValidCourse) {
            return next(new NotFoundError('Mismatch found'));
        }
        // Calculate score
        let totalMarks = 0;
        let obtainedMarks = 0;

        exam.questions.forEach((question) => {
            const userAnswer = answers.find(ans => ans.questionId === question._id.toString());
            if (userAnswer) {
                // Checking correct answer
                const selectedOption = question.options.find(
                    option => option._id.toString() === userAnswer.selectedOptionId
                );

                if (selectedOption && selectedOption.isCorrect) {
                    obtainedMarks += question.marks;
                }
            }
            totalMarks += question.marks;
        });

        // Check if passed or failed
        const isPassed = obtainedMarks >= exam.passMarks;
        // Save the result
        const result = new Result({
            courseId: courseId,
            examId,
            memberId,
            marksObtained : obtainedMarks,
            totalMarks,
            isPassed,
            answers
        });

        await result.save();
        return sendSuccess(res, result, 'Exam submitted successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while submitting exam.'));
    }
};

/**
 * This function is used to get the result of a member
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.getResult = async (req, res, next) => {
    const memberId = req.user.id;
    const examId = req.params.examId;
    try {
        const results = await Result.find({ memberId, examId }).populate('courseId');
        if (!results) {
            return next(new NotFoundError('No results found'));
        }
        return sendSuccess(res, results, 'Results fetched successfully', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while fetching results.'));
    }
};
