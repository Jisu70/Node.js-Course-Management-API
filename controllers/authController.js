// controllers/authController.js
const Admin = require('../models/Admin');
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { DuplicateEntryError, UnhandledError, NotFoundError, UnauthorizedError, BadrequestError } = require("../libs/errorLib");
const { sendSuccess } = require("../libs/responseLib");

exports.registerAdmin = async (req, res, next) => {
    const { name, email, phone, gender, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return next(new DuplicateEntryError('Admin already exists with this email.'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, phone, gender, password: hashedPassword });
        await admin.save();
        return sendSuccess(res, [], 'Admin registered successfully', 201);
    } catch (error) {
        next(new UnhandledError('Error while creating admin.'));
    }
};

exports.loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return next(new NotFoundError('Admin not found.'));

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return next(new UnauthorizedError('Invalid credentials.'));

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return sendSuccess(res, { token }, 'Login successful', 200);
    } catch (error) {
        next(new UnhandledError('Error while logging in.'));
    }
};

exports.registerMember = async (req, res, next) => {
    const { name, email, phone, password } = req.body;

    try {
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
            return next(new DuplicateEntryError('Member already exists with this email.'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const member = new Member({ name, email, phone, password: hashedPassword });
        await member.save();
        return sendSuccess(res, [], 'Member registered successfully', 201);
    } catch (error) {
        next(new UnhandledError('Error while creating member.'));
    }
};

exports.loginMember = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const member = await Member.findOne({ email });
        if (!member) return next(new NotFoundError('Member not found.'));

        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) return next(new UnauthorizedError('Invalid credentials.'));

        const token = jwt.sign({ id: member._id, role: 'member' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return sendSuccess(res, { token }, 'Login successful', 200);
    } catch (error) {
        next(new UnhandledError('Error while logging in.'));
    }
};
