const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

//Database Connection
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("image"));


app.get("/", (req, res) => res.json({ msg: "Welcome to MIS PORTAL" }));
const PORT = process.env.PORT || 5000;
// const PORT = 5000 This works too
//define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/faculty", require("./routes/faculty"));
app.use("/api/studentsection", require("./routes/studentsection"));
// app.use(express.json());

app.listen(PORT, () => console.log("Server started on port", PORT));
