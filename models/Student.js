const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mis: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalCreditsEarned: {
    type: String,
    required: true,
  },
  totalCurrentCredits: {
    type: String,
    required: true,
  },

  currentyear: {
    type: String,
    required: true,
  },
  academicyear: {
    type: String,
    required: true,
  },

  // ref studentInformation
  studentInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentInformation",
  },
  // Reference to AcademicProfile schema
  academicProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicProfile",
  },
  // ref Academic Profile
  //
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("student", StudentSchema);
