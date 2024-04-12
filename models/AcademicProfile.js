const mongoose = require("mongoose");

const AcademicProfileSchema = mongoose.Schema({
  mis: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semesters: [
    {
      semesterName: {
        type: String,
        required: true,
      },
      creditsRegistered: {
        type: Number,
        required: true,
      },
      creditsEarned: {
        type: Number,
        required: true,
      },
      newCGPA: {
        type: Number,
        required: true,
      },
      newSGPA: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      subjects: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", // Reference to another schema (Subject schema)
      },
    },
  ],
});

module.exports = mongoose.model("AcademicProfile", AcademicProfileSchema);
