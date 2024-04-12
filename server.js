const express = require("express");
const app = express();
const connectDB = require("./config/db");
//Database Connection
connectDB();

app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "Welcome to MIS PORTAL" }));
const PORT = process.env.PORT || 5000;
//define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/faculty", require("./routes/faculty"));

app.listen(PORT, () => console.log("Server started on port", PORT));
