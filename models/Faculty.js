const mongoose = require("mongoose");

const FacultySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empno: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  assignedSubjects: [
    {
      subjectCode: {
        type: String,
        required: true,
      },
      subjectName: {
        type: String,
        required: true,
      },
      credits: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("faculty", FacultySchema);
