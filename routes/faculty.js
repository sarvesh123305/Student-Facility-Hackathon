const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Faculty = require("../models/Faculty");

//@routes POST api/faculty
//@desc Register to a faculty;
//@access public

router.post(
  "/",
  [
    check("name", "Please enter a valid name").notEmpty(),
    check("empno", "Please enter a valid empno").exists(),
    check("password", "Please enter a valid password").notEmpty(),
    check("department", "Please enter a valid department").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { name, empno, password, department } = req.body;
    try {
      let user = await Faculty.findOne({ empno });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new Faculty({
        name,
        empno,
        password,
        department,
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
