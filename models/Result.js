const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    selectedOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const resultSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    marksObtained: {
        type: Number,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    isPassed: {
        type: Boolean,
        required: true,
    },
    answers: [answerSchema],
}, {
    timestamps: true,
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
