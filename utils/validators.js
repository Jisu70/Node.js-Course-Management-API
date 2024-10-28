// ======= Express validator ======== //
const { check } = require("express-validator");
const Admin = require('../models/Admin');
const Member = require('../models/Member');
const adminSignupValidators = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage("name is required"),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .notEmpty()
        .withMessage("Email is required")
        .custom(async (value) => {
            try {
              const user = await Admin.findOne({ email: value });
              if (user) {
                throw new Error('E-mail already in use');
              }
            } catch (err) {
                throw new Error(err);
            }
          }),
    check("phone")
        .isMobilePhone()
        .withMessage("Invalid phone number")
        .notEmpty()
        .withMessage("Phone number is required"),
    check("gender")
        .isIn(["male", "female"])
        .withMessage("Invalid gender")
        .notEmpty()
        .withMessage("Gender is required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .notEmpty()
        .withMessage("Password is required")
];

const memberSignupValidators = [
    check("name")
        .trim()
        .notEmpty()
        .withMessage("name is required"),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .notEmpty()
        .withMessage("Email is required")
        .custom(async (value) => {
            try {
              const user = await Member.findOne({ email: value });
              if (user) {
                throw new Error('E-mail already in use');
              }
            } catch (err) {
                throw new Error(err);
            }
          }),
    check("phone")
        .isMobilePhone()
        .withMessage("Invalid phone number")
        .notEmpty()
        .withMessage("Phone number is required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .notEmpty()
        .withMessage("Password is required"),
];

module.exports = { adminSignupValidators, memberSignupValidators }