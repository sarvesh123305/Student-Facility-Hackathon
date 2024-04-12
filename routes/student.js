const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student");
const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// //@routes GET api/auth
// //@desc Get Loggedin user
// //@access Private

// router.get("/", auth, async (req, res) => {
//   try {
//     console.log(req.student);
//     // const user = await Contact.findById(req.user.id).select("-password");
//     // res.json(user);
//     res.send("Get logged in user");
//   } catch (err) {
//     res.status(500).send("server error occured");
//   }
// });

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
    const { name, mis, password, totalCreditsEarned, totalCurrentCredits } =
      req.body;
    try {
      let user = await Student.findOne({ mis });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      // res.send("Isnt it passed");
      user = new Student({
        name,
        mis,
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

module.exports = router;
