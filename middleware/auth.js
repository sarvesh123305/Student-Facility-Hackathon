const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (role) {
  return function (req, res, next) {
    // Get a token from a header
    // const {token } = req.header('x-auth-token'); //old method deprecated
    // const token = req.headers['x-auth-token'];//new method and should be used
    const token = req.header("x-auth-token");

    // Check if token doesnt exists
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Unauthorized request , no token found" });
    }
    try {
      const decoded = jwt.verify(token, config.get("jwtsecret"));
      // req.student = decoded.user;
      console.log("Role is : ", role, decoded);
      if (decoded.Student) {
        console.log("Student back");
        req.student = decoded.Student;
        console.log("Student actual data is ", req.student);
      } else if (decoded.Others) {
        console.log("Student Section back");
        req.studentsection = decoded.Others;
      } else if (decoded.Faculty) {
        req.faculty = decoded.Faculty;
        console.log("Faculty back");
      } else {
        console.log("No valid user , or expired token");
      }
      switch (role) {
        case "student":
          req.student = decoded.Student;
          break;

        case "faculty":
          req.faculty = decoded.Faculty;
          break;

        case "studentsection": //other refers student section
          req.studentsection = decoded.Others;
          break;
        default:
          break;
        // throw new Error("Invalid role specified");
      }

      console.log("can you reach me");
      if (decoded.Student) {
        console.log("Student");
        req.student = decoded.Student;
      } else if (decoded.Others) {
        console.log("Student Section");
        req.studentsection = decoded.Others;
      } else if (decoded.Faculty) {
        req.faculty = decoded.Faculty;
        console.log("Faculty");
      }
      next(); //Next function is used to pass control to the next middleware function in the request-response
      // cycle.
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid!" });
    }
  };
};
