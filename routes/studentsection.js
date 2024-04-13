const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const { genSalt, hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Other = require("../models/Others");
const Messages = require("../models/Messages");
const bonafides = require('../models/Bonafide');
// const { default: Bonafides } = require("../client/src/pages/StudentSection/Bonafides");  
=======
const Bonafide = require("../models/Bonafide");
// const Message = require("../models/Messages");
//@routes POST api/others
//@desc Register to a others;
//@access public

router.post(
  "/",
  [
    check("name", "Please enter a valid name").notEmpty(),
    check("empno", "Please enter a valid empno").exists(),
    check("password", "Please enter a valid password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { name, empno, password } = req.body;
    try {
      let user = await Other.findOne({ empno });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new Other({
        name,
        empno,
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

// @routes GET api/other/queries
// @desc Get all queries asked so far from different students
// @access private

router.get("/queries", auth("studentsection"), async (req, res) => {
  try {
    const studentQueries = await Messages.find({ to: "Students Section" });
    res.json(studentQueries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occured");
  }
});

//@routes POST api/faculty/queries
//@desc Reply to query send by student
//@access public

router.post(
  "/queries/:messageId",
  [auth("studentsection"), [check("query", "Please enter a query").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { messageId } = req.params;
    console.log(messageId);
    let findQuery = await Messages.findOne({ messageId });
    if (!findQuery) {
      return res.status(400).json({ msg: "Query Doesnt Exists" });
    }
    console.log(findQuery);
    const { query } = req.body;
    try {
      user = new Messages({
        query,
        type: "Reply",
        to: findQuery.from,
        from: req.faculty.id,
        messageId,
      });

      const newMessage = await user.save();
      res.json(newMessage);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occured");
    }
  }
);

router.get('/bonafideApplications', async (req, res) => {
  try {
    // Fetch all bonafide applications from the collection
    const bonafideApplications = await bonafides.find();

    // Check if any bonafide applications were found
    if (!bonafideApplications || bonafideApplications.length === 0) {
      return res.json({ msg: 'No bonafide applications found' });
    }

    // Return the bonafide applications as JSON response
    res.json(bonafideApplications);
  } catch (err) {
    // Log and send an error response if an error occurs
    console.error('Error fetching bonafide applications:', err.message);
    res.status(500).send('Server error occurred');
  }
});

router.post('/bonafideApplicationsStatusYes', async (req, res) => {
  try {
    const bonafideApplicationsStatusYes = await bonafides.findOne({ _id: req.body._id });

    bonafideApplicationsStatusYes.status = 'Accepted';
    bonafideApplicationsStatusYes.save();

    if (!bonafideApplicationsStatusYes || bonafideApplicationsStatusYes.length === 0) {
      return res.json({ msg: 'No bonafide applications found' });
    }

    res.json(bonafideApplications);
  } catch (err) {
    console.error('Error fetching bonafide applications:', err.message);
    res.status(500).send('Server error occurred');
  }
});


router.post('/bonafideApplicationsStatusNo', async (req, res) => {
  try {
    const bonafideApplicationsStatusNo = await bonafides.findOne({ _id: req.body._id });

    bonafideApplicationsStatusNo.status = 'Rejected';
    bonafideApplicationsStatusNo.save();

    if (!bonafideApplicationsStatusNo || bonafideApplicationsStatusNo.length === 0) {
      return res.json({ msg: 'No bonafide applications found' });
    }

    res.json(bonafideApplications);
  } catch (err) {
    console.error('Error fetching bonafide applications:', err.message);
    res.status(500).send('Server error occurred');
  }
})

=======


//@routes POST api/faculty/bonafideApproval
//@desc Approve to reject bonafide
//@access public

router.put(
  "/bonafideApproval",
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    try{
      const { mis, status } = req.body;
      const findBonafide = await Bonafide.findOne({ mis });
      if (!findBonafide) {
        return res.json({ msg: "No document found" });
      }
      
      findBonafide.status = status;
      const updatedBonafide = await findBonafide.save();
      
      res.json(updatedBonafide);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occured");
    }
  }
);
module.exports = router;
