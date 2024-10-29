// ======= Express validator ======== //
const { check } = require("express-validator");
const User = require('../models/User');

// Admin signup validators
const signupValidators = [
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
                const user = await User.findOne({ email: value });
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
    check("role")
        .notEmpty()
        .withMessage("Role is required")   
        .isIn(["admin", "member"])
        .withMessage("Invalid role"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .notEmpty()
        .withMessage("Password is required")
];

module.exports = { signupValidators }