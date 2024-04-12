const mongoose = require("mongoose");

const NotificationsSchema = mongoose.Schema({
  message: { type: String },
  relatedTo: { type: String },
  mis: { type: String },
});

module.exports = mongoose.model("notifications", NotificationsSchema);