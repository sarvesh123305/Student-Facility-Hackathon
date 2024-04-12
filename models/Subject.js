const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  semesterName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      subjectCode: {
        type: String,
        required: true,
      },
      credits: {
        type: String,
        required: true,
      },
      noOfAttempts: {
        type: String,
        required: true,
      },
      awardedGrade: {
        type: String,
        required: true,
      },
      awardedGradePoint: {
        type: String,
        required: true,
      },
      subjectStatus: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Subject", SubjectSchema);
