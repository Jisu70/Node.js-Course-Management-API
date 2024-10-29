const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UnhandledError, NotFoundError, UnauthorizedError, BadrequestError } = require("../libs/errorLib");
const { sendSuccess } = require("../libs/responseLib");

/**
 *  This function is used to register an admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.registerAdmin = async (req, res, next) => {
    const { name, email, phone, gender, role, password } = req.body;

    try {
        if (role !== 'admin') {
            return next(new BadrequestError('Invalid role.'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({ name, email, phone, gender, role, password: hashedPassword });
        await admin.save();
        return sendSuccess(res, [], 'Admin registered successfully', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while creating admin.'));
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
        return sendSuccess(res, [], 'Member registered successfully', 201);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while creating member.'));
    }
};

/**
 * This function is used to login for both admin and member
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(new NotFoundError('User not found.'));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new UnauthorizedError('Invalid credentials.'));

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return sendSuccess(res, { token }, 'Login successful', 200);
    } catch (error) {
        console.log('\x1b[31m', error);
        next(new UnhandledError('Error while logging in.'));
    }
};
