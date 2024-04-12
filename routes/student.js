const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student");
const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Bonafide = require("../models/Bonafide");
const Message = require("../models/Messages");
const { v4: uuidv4 } = require("uuid");

//@routes POST api/student/
//@desc Register to a user
//@access public

router.post(
  "/",
  [
    check("mis", "Please enter a valid email").notEmpty(),
    check("password", "Please enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const {
      name,
      mis,
      password,
      totalCreditsEarned,
      totalCurrentCredits,
      department,
      currentyear,
      academicyear,
    } = req.body;
    try {
      let user = await Student.findOne({ mis });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      // res.send("Isnt it passed");
      user = new Student({
        name,
        mis,
        department,
        currentyear,
        academicyear,
        totalCreditsEarned,
        totalCurrentCredits,
        password,
      });
      const salt = await genSalt(10); // 10 is number of rounds it takes , that is how secureit must be
      user.password = await hash(password, salt);
      await user.save();
      // res.send("User saved int o database magically");
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 36000, //3600 seconds i.e 1 hour
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occured");
    }
  }
);

//@routes POST api/student/requestBonafide
//@desc Register to a bonafide request
//@access public

router.post(
  "/requestBonafide",
  [
    auth("student"),
    [
      check("mis", "Please enter a valid email").notEmpty(),
      check("name", "Please enter a valid name").notEmpty(),
      check("dept", "Please enter a valid department").notEmpty(),

      check("academicYear", "Please enter a valid academicYear").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { name, mis, dept, year, academicYear } = req.body;
    try {
      let user = await Bonafide.findOne({ mis });
      if (user) {
        return res.status(400).json({ msg: "Request already exists" });
      }
      console.log(req.student);
      user = new Bonafide({
        name,
        mis,
        dept,
        year,
        academicYear,
        user: req.student.id,
      });

      const newBonafide = await user.save();
      res.json(newBonafide);
      res.send("User saved int o database magically");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occured");
    }
  }
);

//@routes POST api/student/queries
//@desc Create a query with some ticket no
//@access public

router.post(
  "/queries",
  [
    auth("student"),
    [
      check("query", "Please enter a valid email").notEmpty(),
      check("type", "Please enter a valid name").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { query, type, to, from } = req.body;
    const uuid = uuidv4();
    try {
      user = new Message({
        query,
        type,
        to,
        from,
        messageId: uuid,
      });

      const newMessage = await user.save();
      // res.send("User saved int o database magically");
      res.json(newMessage);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occured");
    }
  }
);

//@routes GET api/student/queries
//@desc Get all my queries a queries asked so far
//@access public

router.get("/queries", auth("student"), async (req, res) => {
  try {
    const studentQueries = await Message.find({ from: req.student.id });
    res.json(studentQueries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occured");
  }
});


// router.get("/elective", auth("student"), async (req, res) =>  {

//     try {
//       // get alloted elective from the respective database
//       const result = 

//       res.json(result);
//     } catch (error) {
//       res.status(500).send("Internal Server Error");
//     }
// });

// router.post("/elective", auth("student"), async (req, res) =>  {

//   try {
    
//     const id = req.student.id;
//     const {preferences} = req.body;
//     // Save all preferences to a elective collection
//     const result = 
//     res.json(result);
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;
