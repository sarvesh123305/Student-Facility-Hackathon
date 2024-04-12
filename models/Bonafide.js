const mongoose = require("mongoose");

const BonafideSchema = mongoose.Schema({
  name: { type: String, required: true },
  mis: { type: String, required: true },
  dept: { type: String, required: true },
  year: { type: String, required: true },
  academicYear: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("bonafide", BonafideSchema);
