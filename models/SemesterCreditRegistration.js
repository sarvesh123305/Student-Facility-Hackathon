const mongoose = require("mongoose");

const SemesterCreditRegistrationSchema = mongoose.Schema({
  mis: {
    type: String,
    required: true,
  },
  semesterName: {
    type: String,
    required: true,
  },
  cgpa: {
    type: String,
    required: true,
  },
  sgpa: {
    type: String,
    required: true,
  },
  electives: { type: Object, required: true },
  subjects: [{ type: String, required: true }],
});

module.exports = mongoose.model(
  "semestercreditregistration",
  SemesterCreditRegistrationSchema
);
