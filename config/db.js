const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {})
    .then(() => console.log("Mongodb connected"))
    .catch((err) => {
      console.error("Mongodb connection failed:", err);
      process.exit(1);
    });
};

module.exports = connectDB;
