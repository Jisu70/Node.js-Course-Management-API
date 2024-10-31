// ======= Express validator ======== //
const { check } = require("express-validator");
const User = require('../models/User');

// signup validators
const signupValidators = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage("name is required"),
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('E-mail already in use');
                }
            } catch (err) {
                throw new Error(err);
            }
        }),
    check("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone()
        .withMessage("Invalid phone number"),
    check("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .isIn(["male", "female"])
        .withMessage("Invalid gender"),
    check("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["admin", "member"])
        .withMessage("Invalid role"),
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
];

const submitExamAnswerValidators = [
    check("examId")
        .notEmpty()
        .withMessage("Exam ID is required"),
    check("answers")
        .notEmpty()
        .withMessage("Answers is required")
        .isArray()
        .withMessage("Answers must be an array of objects")
]

const loginValidators = [
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .notEmpty()
        .withMessage("Password is required")
]

const createCourseValidators = [
    check("courseName")
        .notEmpty()
        .withMessage("Course name is required"),
    check("description")
        .notEmpty()
        .withMessage("Description is required")
]

const createExamValidators = [
    check("courseId")
        .notEmpty()
        .withMessage("Course ID is required")
        .isMongoId()
        .withMessage("Invalid course ID, should be a mongo ID"),
    check("examName")
        .notEmpty()
        .withMessage("Exam name is required")
        .isString()
        .withMessage("Exam name must be a string"),
    check("totalMarks")
        .notEmpty()
        .withMessage("Total marks is required")
        .isNumeric()
        .withMessage("Total marks must be a number"),
    check("passMarks")
        .notEmpty()
        .withMessage("Pass marks is required")
        .isNumeric()
        .withMessage("Pass marks must be a number"),
    check("examDuration")
        .notEmpty()
        .withMessage("Exam duration is required")
        .isNumeric()
        .withMessage("Exam duration must be a number in minutes"),
    check("questions")
        .notEmpty()
        .withMessage("Questions is required")
        .isArray()
        .withMessage("Questions must be an array of objects")
]

const assignCourseValidators = [
    check("courseId")
        .notEmpty()
        .withMessage("Course ID is required")
        .isMongoId()
        .withMessage("Invalid course ID, should be a mongo ID"),
    check("examId")
        .notEmpty()
        .withMessage("Exam ID is required")
        .isMongoId()
        .withMessage("Invalid exam ID, should be a mongo ID")
]

const getExamsForCourseValidators = [
    check("courseId")
        .notEmpty()
        .withMessage("Course ID is required")
        .isMongoId()
        .withMessage("Invalid course ID, should be a mongo ID")
]

const getExamResultValidators = [
    check("examId")
        .notEmpty()
        .withMessage("Exam ID is required")
        .isMongoId()
        .withMessage("Invalid exam ID, should be a mongo ID")
]
module.exports = { signupValidators, submitExamAnswerValidators, loginValidators, createCourseValidators, createExamValidators, assignCourseValidators, getExamsForCourseValidators, getExamResultValidators }