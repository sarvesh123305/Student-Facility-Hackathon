const mongoose = require("mongoose");

const MarksSchema = mongoose.Schema({
  mis: { type: Number },
  t1: { type: Number },
  t2: { type: Number },
  ese: { type: Number },
  total: { type: Number },
});

module.exports = mongoose.model("marks", MarksSchema);