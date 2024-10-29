
const Course = require('../models/Course');
const Exam = require('../models/Exam');
const Result = require('../models/Result');

exports.getCoursesForMember = async (req, res) => {
    try {
        const courses = await Course.find({ assignedMembers: req.user.id }).populate('exams');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExamsForCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('exams');
        res.json(course.exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitExamAnswer = async (req, res) => {
    try {
        const { examId } = req.params;
        const { answers } = req.body;
        const memberId = req.user.id;

        // Fetch the exam details
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        // Calculate score
        let totalMarks = 0;
        let obtainedMarks = 0;

        exam.questions.forEach((question) => {
            const userAnswer = answers.find(ans => ans.questionId === question._id.toString());
            if (userAnswer) {
                // Check if selected option is the correct answer
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
            courseId: exam._id,
            examId,
            memberId,
            marksObtained : obtainedMarks,
            totalMarks,
            isPassed,
            answers
        });

        await result.save();

        res.status(200).json({
            message: 'Exam submitted successfully',
            obtainedMarks,
            totalMarks,
            isPassed
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
