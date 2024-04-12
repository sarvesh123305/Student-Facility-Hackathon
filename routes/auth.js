const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Others = require("../models/Others");

// ------------------------------------------Student Routes-------------------------------------------
//@routes GET api/auth/student
//@desc Get Loggedin user
//@access Private

router.get("/student", auth("student"), async (req, res) => {
  try {
    const user = await Student.findById(req.student.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("server error occured");
  }
});
//@routes GET api/auth/faculty
//@desc Get Loggedin faculty
//@access Private

router.get("/faculty", auth("faculty"), async (req, res) => {
  try {
    console.log("Got in ", req.faculty);
    const user = await Faculty.findById(req.faculty.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("server error occured");
  }
});
//@routes POST api/auth/student
//@desc Auth user and get token
//@access public

router.post(
  "/student",
  [
    check("mis", "Please enter a valid email").notEmpty(),
    check("password", "Please enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const salt = await genSalt(10); // 10 is number of rounds it takes , that is how secureit must be
    console.log("Passowrd", await hash("password123", salt));
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { mis, password } = req.body;
    try {
      let user = await Student.findOne({ mis });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      const payload = {
        Student: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000, //3600 seconds i.e 1 hour
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error occured");
    }
  }
);

//-----------------------------------Faculty Routes-------------------

//@routes POST api/auth/student
//@desc Auth user and get token
//@access public

router.post(
  "/faculty",
  [
    check("empno", "Please enter a valid email").notEmpty(),
    check("password", "Please enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { empno, password } = req.body;

    try {
      let user = await Faculty.findOne({ empno });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      const payload = {
        Faculty: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000, //3600 seconds i.e 1 hour
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error occured");
    }
  }
);

//@routes POST api/auth/others
//@desc Auth others and get token
//@access public

router.post(
  "/studentsection",
  [
    check("empno", "Please enter a valid email").notEmpty(),
    check("password", "Please enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { empno, password } = req.body;
    try {
      let user = await Others.findOne({ empno });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      const payload = {
        Others: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000, //3600 seconds i.e 1 hour
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error occured");
    }
  }
);
module.exports = router;
