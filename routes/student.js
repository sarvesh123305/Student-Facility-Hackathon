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
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require("mongodb");
const Subject = require("../models/Subject");
const AcademicProfile = require("../models/AcademicProfile");
const StudentInformation = require("../models/StudentInformation");

const uri =
  "mongodb+srv://sarveshkulkarni2106:123@contactkeeper.jkrszl5.mongodb.net/?retryWrites=true&w=majority&appName=Contactkeeper"; // MongoDB Atlas connection URI
const client = new MongoClient(uri);

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

router.post("/elective/result/:dbName", async (req, res) => {
  try {
    // get alloted elective from the respective database
    const dbName = req.params.dbName;
    const body = req.body;

    let mis = body["MIS"];
    connectToAtlas();
    const query = { MIS: mis };
    const database = client.db(dbName);
    const collection = database.collection("Results");
    const document = await collection.findOne(query);
    res.json(document);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

async function connectToAtlas() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

async function createCollectionInAtlas(dbName, collectionName) {
  try {
    const db = client.db(dbName);
    await db.createCollection(collectionName);
    console.log("Collection created in MongoDB Atlas:", collectionName);
  } catch (error) {
    console.error("Error creating collection in MongoDB Atlas:", error);
  }
}

async function addDocumentToCollection(document, dbName, collectionName) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(document);
    console.log("Document added to collection:", result.insertedId);
  } catch (error) {
    console.error("Error adding document to collection:", error);
  }
}

router.post("/elective", async (req, res) => {
  try {
    // const id = req.student.id;
    const preferences = req.body;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    let db = preferences["NameOfSubject"] + " " + currentYear;

    const dbName = db.replace(/\s+/g, "_");

    connectToAtlas();
    addDocumentToCollection(preferences, dbName, "Responses");

    res.send(preferences["NameOfSubject"]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//@routes GET api/student/getResult
//@desc Get specific semester result
//@access public

router.get(
  "/getResult",
  [
    // auth("student"),
    [
      check("mis", "Please enter a valid email").notEmpty(),
      check("semesterName", "Please enter a valid semesterName").notEmpty(),
      check("year", "Please enter a valid academicYear").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { mis, semesterName, year } = req.body;
    try {
      let user = await Student.findOne({ mis });
      if (!user) return res.status(400).json({ msg: "No such student found" });

      let { academicProfile } = user;
      console.log(academicProfile);
      let getAcademicProfile = await AcademicProfile.findOne({
        _id: academicProfile,
      });
      if (!getAcademicProfile)
        return res.status(400).json({ msg: "No Academic Profile found" });

      let { semesters } = getAcademicProfile;

      let specificSemester = semesters.find(
        (sem) => sem.semesterName === semesterName
      );
      let { subjects } = specificSemester;
      console.log("Subjects", subjects);

      let getSubjects = await Subject.findOne({ _id: subjects });
      if (!getSubjects)
        return res.status(400).json({ msg: "No Subjects found" });
      // console.log(getSubjects);

      const result = {
        mis: mis,
        subjectsList: getSubjects.subjects,
        cgpa: specificSemester.newCGPA,
        sgpa: specificSemester.newSGPA,
        branch: getAcademicProfile.branch,
        name: user.name,
        academicyear: year,
        totalCreditsEarned: user.totalCreditsEarned,
        totalCurrentCredits: user.totalCurrentCredits,
      };
      res.json({ result });
      // res.send("User saved int o database magically");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occured");
    }
  }
);
/*
  TESTING WORK
*/
router.post("/subjecttesting", async (req, res) => {
  const { semesterName, department, subjects } = req.body;
  try {
    let user = await Subject.findOne({ semesterName });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // res.send("Isnt it passed");
    user = new Subject({
      semesterName,
      department,
      subjects,
    });
    const subjectsSaved = await user.save();
    res.json(subjectsSaved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occured");
  }
});
router.post("/testingstudentinfo", async (req, res) => {
  const {
    MIS,
    ProfilePhoto,
    PersonalInformation,
    FamilyInformation,
    ContactInformation,
  } = req.body;

  try {
    let existingStudent = await StudentInformation.findOne({ MIS });
    if (existingStudent) {
      return res
        .status(400)
        .json({ msg: "Student with the same MIS already exists" });
    }

    const newStudent = new StudentInformation({
      MIS,
      ProfilePhoto,
      PersonalInformation,
      FamilyInformation,
      ContactInformation,
    });
    const savedStudent = await newStudent.save();

    res.status(201).json({ savedStudent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occurred");
  }
});

router.post("/testingAcademicProfile", async (req, res) => {
  const { mis, branch, year, semesters } = req.body;

  try {
    // Check if an academic profile with the same MIS already exists
    let existingProfile = await AcademicProfile.findOne({ mis });
    if (existingProfile) {
      return res
        .status(400)
        .json({ msg: "Academic profile with the same MIS already exists" });
    }

    // Create a new AcademicProfile instance and save it
    const newProfile = new AcademicProfile({
      mis,
      branch,
      year,
      semesters,
    });
    const savedProfile = await newProfile.save();

    res.status(201).json({
      profile: savedProfile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occurred");
  }
});

router.post("/testingRegisterStudent", async (req, res) => {
  const {
    name,
    mis,
    password,
    totalCreditsEarned,
    totalCurrentCredits,
    currentyear,
    academicyear,
    studentInformation,
    academicProfile,
  } = req.body;
  console.log(req.body);
  try {
    // Check if a student with the same MIS already exists
    let existingStudent = await Student.findOne({ mis });
    if (existingStudent) {
      return res
        .status(400)
        .json({ msg: "Student with the same MIS already exists" });
    }

    // Create a new Student instance and save it
    const newStudent = new Student({
      name,
      mis,
      password,
      totalCreditsEarned,
      totalCurrentCredits,
      currentyear,
      academicyear,
      studentInformation,
      academicProfile,
    });
    const salt = await genSalt(10); // 10 is number of rounds it takes , that is how secureit must be
    newStudent.password = await hash(password, salt);
    const savedStudent = await newStudent.save();
    res.status(201).json({ savedStudent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occurred");
  }
});

module.exports = router;
