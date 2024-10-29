const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    assignedMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
    }],
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
