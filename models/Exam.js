const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: [{
        optionText: String,
        isCorrect: Boolean,
    }],
    marks: {
        type: Number,
        required: true,
    },
});

const examSchema = mongoose.Schema({
    examName: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    passMarks: {
        type: Number,
        required: true,
    },
    examDuration: {
        type: Number,
        required: true,
    },
    questions: [questionSchema],
}, {
    timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
