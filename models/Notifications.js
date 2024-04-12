const mongoose = require("mongoose");

const NotificationsSchema = mongoose.Schema({
  message: { type: String },
  messageType: { type: String },
  mis: { type: Number },
});

module.exports = mongoose.model("notifications", NotificationsSchema);