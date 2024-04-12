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
  sgpa: {
    type: Map,
    of: String,
    required: true,
    default: {},
  },
  totalCreditsEarned: {
    type: String,
    required: true,
  },
  totalCurrentCredits: {
    type: String,
    required: true,
  },
  department: {
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("student", StudentSchema);
