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
const { MongoClient } = require("mongodb");
const Subject = require("../models/Subject");
const AcademicProfile = require("../models/AcademicProfile");
const Notifications = require("../models/Notifications");
const StudentInformation = require("../models/StudentInformation");
const FeeReceipt = require("../models/FeeReceipt");
const fs = require("fs");

const PDFDocument = require("pdfkit");
const axios = require("axios");
const { format } = require("date-fns");
const SemesterCreditRegistration = require("../models/SemesterCreditRegistration");
const { userData } = require("./userData");
const mongodbURLURIOPTIMIZE = config.get("mongoURI");
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

//@routes GET api/student/updateStudent
//@desc Update Student Details
//@access public

router.put(
  "/updateStudent/:MIS",
  [
    // auth("student"),
    [
      // check("MIS", "mis is required").notEmpty(),
      // check("ProfilePhoto", "ProfilePhoto is required").notEmpty(),
      // check("PersonalInformation", "ProfilePhoto is required").notEmpty(),
      // check("FamilyInformation", "ProfilePhoto is required").notEmpty(),
      // check("ContactInformation", "ContactInformation is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const {
      MIS,
      ProfilePhoto,
      PersonalInformation,
      FamilyInformation,
      ContactInformation,
    } = req.body;
    try {
      // const studentFields = {};
      const findStudent = await Student.findOne({ mis: MIS });
      const studentInformation = await StudentInformation.findById(
        findStudent.studentInformation
      );
      if (ProfilePhoto) {
        studentInformation.ProfilePhoto = ProfilePhoto;
      }
      if (PersonalInformation) {
        studentInformation.PersonalInformation = PersonalInformation;
      }
      if (FamilyInformation) {
        studentInformation.FamilyInformation = FamilyInformation;
      }
      if (ContactInformation) {
        studentInformation.ContactInformation = ContactInformation;
      }
      await studentInformation.save();
      console.log("Sucesss");
      res.json(studentInformation);
    } catch (err) {
      console.log("Errors", err);
    }
  }
);

//@routes POST api/student/requestBonafide
//@desc Register to a bonafide request
//@access public
router.post(
  "/requestBonafide",
  // [
  //   auth("student"),
  //   [
  //     check("mis", "Please enter a valid email").notEmpty(),
  //     check("name", "Please enter a valid name").notEmpty(),
  //     check("dept", "Please enter a valid department").notEmpty(),

  //     check("academicYear", "Please enter a valid academicYear").notEmpty(),
  //   ],
  // ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    }
    const { name, mis, dept, year, academicYear, programme, purpose } =
      req.body;
    const currentYear = ["First", "Second", "Third", "Final"];
    const cwd = process.cwd();
    console.log("Year", typeof year, year);
    console.log("The year", currentYear[year - 1]);
    try {
      // let user = await Bonafide.findOne({ mis });
      // if (user) {
      //   return res.status(400).json({ msg: "Request already exists" });
      // }
      // console.log(req.student);
      // user = new Bonafide({
      //   name,
      //   mis,
      //   dept,
      //   year,
      //   academicYear,
      //   // user: req.student.id,
      // });

      const doc = new PDFDocument({ size: "Letter", layout: "landscape" });

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="Bonafide_${mis}.pdf"`
      );
      res.setHeader("Content-Type", "application/pdf");
      doc.pipe(res);
      doc.fontSize(18);

      doc.image(
        // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/BonafideHeader.png",
        cwd + "/routes/BonafideHeader.png",
        {
          width: 765, // Set the width of the image
          height: 150, // Fit the image into a 100x100 box
          x: 20,
          y: 20,
        }
      );
      doc
        .font("Times-Roman")
        .text(`No./COEP/SS/B.C/2024`, 30, 168, { align: "left" });

      const currentDate = format(new Date(), "dd/MM/yyyy");
      doc
        .font("Times-Bold")
        .text(`Date:  ${currentDate}`, 570, 170, { align: "right" });

      doc.image(
        // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/Header.png",
        cwd + "/routes/Header.png",

        {
          width: 300, // Set the width of the image
          height: 50, // Fit the image into a 100x100 box
          x: 260,
          y: 210,
        }
      );
      doc.font("Times-Roman").text(`This is to certify that `, 90, 300);
      doc.font("Times-Bold").text(`${name}`, 270, 300);
      doc.font("Times-Roman").text(`is a bonafide Student of`, 545, 300);

      doc
        .font("Times-Roman")
        .text(`this Institute studying in`, 60, 330, { align: "left" });
      doc.font("Times-Bold").text(`${year}`, 240, 330);
      doc.font("Times-Roman").text(`Year`, 290, 330);
      doc.font("Times-Bold").text(`${programme}`, 330, 330);
      doc.font("Times-Roman").text(`in`, 390, 330);
      doc.font("Times-Bold").text(`${dept}`, 409, 330);
      doc.font("Times-Roman").text(`during the Year`, 590, 330);

      doc.font("Times-Bold").text(`${academicYear}. `, 60, 360);
      doc.font("Times-Bold").text(`His/ Her`, 150, 360);
      doc.font("Times-Roman").text(`MIS No.`, 220, 360);
      doc.font("Times-Bold").text(`${mis}.`, 285, 360);
      doc
        .font("Times-Roman")
        .text(`This certificate is issued for the purpose of `, 100, 390);
      doc.font("Times-Bold").text(`Scholarship.`, 415, 390);

      // doc.image(
      //   // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/coepStamp.png",
      //   cwd + "/routes/coepStamp.png",

      //   {
      //     width: 150, // Set the width of the image
      //     height: 150, // Fit the image into a 100x100 box
      //     x: 250,
      //     y: 450,
      //   }
      // );

      doc.font("Times-Bold").text(`Place : Pune`, 50, 450, { align: "Left" });

      // doc
      //   .font("Times-Bold")
      //   .text(`Date: ${currentDate}`, 50, 480, { align: "left" });

      doc
        .font("Times-Bold")
        .text(`Digitally Signed By`, 90, 450, { align: "right" });

      doc.font("Times-Bold").text(`Registrar`, 90, 480, { align: "right" });

      doc
        .font("Times-Bold")
        .text(`Date: 12/4/2024`, 90, 510, { align: "right" });

      // doc.font("Times-Roman").text(`Registrar`, 560, 490);
      // doc
      //   .font("Times-Roman")
      //   .text(`COEP Technological University, Pune`, 430, 510);

      doc.image(cwd + "/routes/Images/greenTick.png", {
        width: 50,
        height: 50,
        x: 650,
        y: 460,
        opacity: 0.01,
      });

      doc.end();

      // res.json(newBonafide);

      // res.send("User saved int o database magically");
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
    console.log("In");
    const { query, type, from } = req.body;
    const uuid = uuidv4();
    try {
      user = new Message({
        query,
        type,
        to: "Students Section",
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
    if (!studentQueries) {
      res.json({ msg: "No queries found" });
    }
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

// async function createCollectionInAtlas(dbName, collectionName) {
//   try {
//     const db = client.db(dbName);
//     await db.createCollection(collectionName);
//     console.log("Collection created in MongoDB Atlas:", collectionName);
//   } catch (error) {
//     console.error("Error creating collection in MongoDB Atlas:", error);
//   }
// }

async function addDocumentToCollection(document, dbName, collectionName) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(document);
    console.log("Document added to collection:", result.insertedId);
    return result;
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

router.post(
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

//@routes GET api/student/getStudentDetails
//@desc Get Student Details
//@access public
router.get(
  "/getStudentDetails",
  [auth("student"), [check("mis", "mis is required")]],
  async (req, res) => {
    try {
      // const { mis } = req.query;
      const mis = req.student.id;
      const studentDetails = await Student.findOne({ _id: mis });
      if (!studentDetails)
        return res.status(404).json({ message: "Student not found" });
      const studentInformation = await StudentInformation.findOne({
        _id: studentDetails.studentInformation,
      });
      if (!studentInformation)
        return res
          .status(404)
          .json({ message: "Student Information not found" });

      const academicProfile = await AcademicProfile.findOne({
        _id: studentDetails.academicProfile,
      });

      if (!academicProfile) {
        return res
          .status(404)
          .json({ message: "Student Academic Profile not found" });
      }
      // removing sensitive fields
      delete studentDetails.studentInformation;
      delete studentDetails.academicProfile;
      delete studentDetails._id;
      delete academicProfile._id;
      delete studentInformation._id;
      delete academicProfile.semesters;

      res.json({
        studentDetails,
        studentInformation,
        academicProfile,
      });
    } catch (error) {}
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

router.post("/register", async (req, res) => {
  try {
    // const id = req.student.id;
    const student = req.body;

    const collection = student["Branch"] + student["Year"];
    console.log(collection);

    connectToAtlas();
    addDocumentToCollection(student, "Student", collection);

    res.send("Student Registered");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// const tableData = [
//   ["Course Code", "Course Name", "Course Credit", "Grade Earned"],
//   ["AS-20001", "Biology for Engineers", "3", "AB"],
//   ["CT-20015", "Data Communication", "3", "AA"],
//   ["CT-20017", "Data Structures and Algorithms - II Laboratory", "1", "AA"],
//   ["CT-20014", "Data Structures and Algorithms ±II", "2", "AB"],
//   ["CT-20013", "Microprocessor Techniques", "3", "AA"],
//   ["CT-20016", "Microprocessor Techniques Laboratory", "1", "AB"],
//   [
//     "CT-20018",
//     "Rapid Prototyping Practice Using Object Oriented Programming",
//     "2",
//     "AA",
//   ],
//   ["ICE(IF)-20002", "Sensors and Automation", "2", "AB"],
//   ["CT-20012", "Theory of Computation", "4", "BB"],
//   ["MA-20005", "Multivariate Calculus And Differential Equations", "5", "AA"],
//   ["", "Credit Earned:-", "26", ""],
// ];

// let studentDetails = {
//   academicYear:'2022-2023',
//   prn: 142203002,
//   name: 'BARGIR SOHEL SHAMSHUDDIN',
//   branch: 'Computer Engineering',
//   Programme: 'B.Tech',
//   Semester: 'Semester IV',
//   cgpa: 8.43,
//   sgpa: 9.38
// }
let tableData = [
  ["Course Code", "Course Name", "Course Credit", "Grade Earned"],
];

let studentDetails = {};

async function fetchData(studentData, res) {
  let { mis, semesterName, year } = studentData;
  try {
    let user = await Student.findOne({ mis });
    if (!user) return res.status(400).json({ msg: "No such student found" });

    let { academicProfile } = user;
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

    let getSubjects = await Subject.findOne({ _id: subjects });
    if (!getSubjects) return res.status(400).json({ msg: "No Subjects found" });

    studentDetails = {
      prn: mis,
      cgpa: specificSemester.newCGPA,
      sgpa: specificSemester.newSGPA,
      branch: getAcademicProfile.branch,
      name: user.name,
      academicYear: user.academicyear,
      totalCreditsEarned: user.totalCreditsEarned,
      totalCurrentCredits: user.totalCurrentCredits,
      Programme: "B.Tech",
      Semester: specificSemester.semesterName,
    };

    const subs = getSubjects.subjects;

    for (const x of subs) {
      console.log(x.subjectName);
      tableData.push([x.subjectCode, x.subjectName, x.credits, x.awardedGrade]);
    }

    tableData.push([
      "",
      "Credits Earned",
      studentDetails.totalCreditsEarned,
      "",
    ]);
  } catch (err) {
    console.error(err.message);
  }
}

router.post("/result", async (req, res) => {
  try {
    const studentData = req.body;
    console.log(req.body);
    const cwd = process.cwd();
    tableData = [
      ["Course Code", "Course Name", "Course Credit", "Grade Earned"],
    ];
    studentDetails = {};
    await fetchData(studentData, res);

    const doc = new PDFDocument({ size: "A4" });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="table_example.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(11);
    const table = {
      headers: tableData[0],
      rows: tableData.slice(1),
    };

    doc.image(
      // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/watermark.png",
      cwd + "/routes/watermark.png",
      {
        width: 320,
        height: 500,
        x: 150,
        y: 200,
        opacity: 0.01,
      }
    );

    doc.image(
      // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/image1.png",
      cwd + "/routes/image1.png",

      {
        width: 600, // Set the width of the image
        height: 130, // Fit the image into a 100x100 box
        x: 10,
        y: 10,
      }
    );
    const currentDate = format(new Date(), "dd/MM/yyyy");
    doc
      .font("Helvetica-Bold")
      .text("Provisional Grade Report", 100, 140, { align: "center" });

    // Add date text to the PDF at specific Y position aligned to the right
    doc
      .font("Helvetica-Bold")
      .text(`Date: ${currentDate}`, 420, 140, { align: "right" });

    doc
      .font("Helvetica-Bold")
      .text(`Academic Year:  ${studentDetails.academicYear}`, 50, 165, {
        align: "left",
      });
    doc
      .font("Helvetica-Bold")
      .text(`Progamme:  ${studentDetails.Programme}`, 400, 165, {
        align: "right",
      });
    doc
      .font("Helvetica-Bold")
      .text(`Student PRN No:  ${studentDetails.prn}`, 50, 190, {
        align: "left",
      });
    doc
      .font("Helvetica-Bold")
      .text(`Semester: ${studentDetails.Semester}`, 400, 190, {
        align: "right",
      });

    doc
      .font("Helvetica-Bold")
      .text(`Student Name:  ${studentDetails.name}`, 50, 215, {
        align: "left",
      });
    doc
      .font("Helvetica-Bold")
      .text(`Branch Name:  ${studentDetails.branch}`, 50, 240, {
        align: "left",
      });

    doc
      .font("Helvetica-Bold")
      .text(`SGPA: ${studentDetails.sgpa}`, 50, 280, { align: "left" });
    doc
      .font("Helvetica-Bold")
      .text(`CGPA: ${studentDetails.cgpa}`, 460, 280, { align: "left" });

    doc
      .font("Helvetica-Bold")
      .text(
        `Note: "This is system generated Provisional Grade Report.No signature is required."`,
        50,
        660,
        { align: "center" }
      );
    doc.font("Helvetica").text(
      `Honors/Minor: Respective Credits and Grades are not considered towards total Credits acquired and calculations of
    SGPA and CGPA.`,
      50,
      680,
      { align: "center" }
    );

    // Draw the table
    drawTable(doc, table, {
      x: 33,
      y: 310,
      padding: 5,
      lineSpace: 3,
      colWidths: [100, 240, 95, 95],
    });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

// Function to draw a table in the PDF document with custom column widths and alignments
function drawTable(doc, table, options) {
  let { x, y, padding, lineSpace, colWidths } = options;
  const rowHeight = 25;

  doc.font("Helvetica-Bold");

  // Draw table headers with custom column widths
  table.headers.forEach((header, i) => {
    doc.rect(x, y, colWidths[i], rowHeight + lineSpace).stroke();
    doc.text(header, x + padding, y + padding, {
      width: colWidths[i] - 2 * padding,
      align: "center",
    });
    x += colWidths[i];
  });

  doc.font("Helvetica");

  // Draw table rows with custom column widths and alignments
  let yOffset = y + rowHeight + lineSpace;
  table.rows.forEach((row, rowIndex) => {
    let xOffset = x - colWidths.reduce((acc, val) => acc + val, 0);
    row.forEach((cell, i) => {
      const align = i === 1 ? "left" : "center"; // Align 'Course Name' column to the left
      doc.rect(xOffset, yOffset, colWidths[i], rowHeight + lineSpace).stroke();
      if (rowIndex === table.rows.length - 1) {
        // Change 3 to the index of the row you want to make bold
        doc
          .font("Helvetica-Bold")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      } else {
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      }
      xOffset += colWidths[i];
    });
    yOffset += rowHeight + lineSpace;
  });

  // Draw outer table border
  const tableWidth = colWidths.reduce((acc, val) => acc + val, 0);
  const tableHeight =
    rowHeight * (table.rows.length + 1) + lineSpace * table.rows.length;
  doc.rect(x - tableWidth, y, tableWidth, tableHeight + lineSpace).stroke();
}

router.post("/subjectFetchtesting", async (req, res) => {
  const { sName } = req.body;
  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("SemsesterSubjects");
    const query = { semesterName: sName };
    const document = await collection.findOne(query);

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error finding document");
  }
});

router.post(
  "/semesterCreditRegistration",
  [
    check("electives", "electives is required"),
    check("subjects", "subjects are required"),
    check("mis", "mis are required"),
    check("semesterName", "semesterName are required"),
  ],
  async (req, res) => {
    const { electives, subjects, mis, semesterName } = req.body;
    try {
      console.log("Hello", mis, semesterName);
      const existReg = await SemesterCreditRegistration.findOne({
        mis: mis,
        semesterName: semesterName,
      });
      console.log("Reg", existReg);
      if (existReg)
        return res.json({ msg: "Student with the same MIS already exists" });

      const newReg = new SemesterCreditRegistration({
        electives,
        semesterName,
        subjects,
        mis,
      });
      await newReg.save();
      res.json({ msg: "Semester Credit Registration Success" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.get("/notifications/:mis", async (req, res) => {
  try {
    const mis = req.params.mis;
    const private = await Notifications.find({ mis: Number(mis) });
    const public = await Notifications.find({ mis: "All" });
    const combinedResults = {
      public: public,
      private: private,
    };

    res.status(200).send(combinedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occured");
  }
});

router.get("/semesterCreditRegistration", async (req, res) => {
  try {
    const allRegistrations = await SemesterCreditRegistration.find({});
    res.json(allRegistrations);
  } catch (error) {
    console.log(error);
  }
});

//@routes GET api/student/FeeReceipt
//@desc Get Fee Receit m,jgkljdjgkjldlkjdtlkjjdflkjy
//@access public

router.post("/FeeReceipt", async (req, res) => {
  const { formData } = req.body;
  console.log("IN axis", formData);
  // console.log(formData.TutionFee + formData.TnpFee);
  // const formData = {
  //   FullName: "Sanika Kulkarni",
  //   Year: 2024,
  //   MobileNumber: "1234567890",
  //   Mis: 142203011,
  //   Branch: "Computer Science",
  //   Category: "General",
  //   DateOfPayment: "2024-04-12",
  //   TutionFee: 5000,
  //   DevelopmentFee: 2000,
  //   GymkhanaFee: 1000,
  //   TnpFee: 1500,
  //   Library: 500,
  //   Laboratory: 1000,
  //   InternetAndEmail: 200,
  //   Gathering: 300,
  //   Cmd: 400,
  //   BoatClubFee: 100,
  //   BoatClubMemFee: 50,
  //   StudentAidFund: 200,
  //   ExamFee: 800,
  //   IdentityCard: 100,
  //   UniversityFee: 3000,
  //   AluminiFee: 200,
  //   HostelFee: 5000,
  //   HostelDepost: 2000,
  //   AraiLibFee: 300,
  //   AraiCompFee: 400,
  //   AraiLabFee: 500,
  //   AraiAluminiFee: 100,
  //   LeavingCert: 200,
  //   StudentAid: 300,
  //   Fine: 50,
  //   Other: 100,
  //   uploadSbiFee: 200,
  // };
  try {
    const studentData = req.body;
    const currentDateTime = new Date();
    const formattedDateTime = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");
    const currentDate = format(new Date(), "dd/MM/yyyy");
    console.log(req.body);
    const cwd = process.cwd();
    // Convert number fields to integers
    const formDataWithInt = {
      TutionFee: parseInt(formData.TutionFee),
      DevelopmentFee: parseInt(formData.DevelopmentFee),
      GymkhanaFee: parseInt(formData.GymkhanaFee),
      TnpFee: parseInt(formData.TnpFee),
      Library: parseInt(formData.Library),
      Laboratory: parseInt(formData.Laboratory),
      InternetAndEmail: parseInt(formData.InternetAndEmail),
      Gathering: parseInt(formData.Gathering),
      Cmd: parseInt(formData.Cmd),
      BoatClubFee: parseInt(formData.BoatClubFee),
      BoatClubMemFee: parseInt(formData.BoatClubMemFee),
      StudentAidFund: parseInt(formData.StudentAidFund),
      ExamFee: parseInt(formData.ExamFee),
      IdentityCard: parseInt(formData.IdentityCard),
      UniversityFee: parseInt(formData.UniversityFee),
      AluminiFee: parseInt(formData.AluminiFee),
      HostelFee: parseInt(formData.HostelFee),
      HostelDepost: parseInt(formData.HostelDepost),
      AraiLibFee: parseInt(formData.AraiLibFee),
      AraiCompFee: parseInt(formData.AraiCompFee),
      AraiLabFee: parseInt(formData.AraiLabFee),
      AraiAluminiFee: parseInt(formData.AraiAluminiFee),
      LeavingCert: parseInt(formData.LeavingCert),
      StudentAid: parseInt(formData.StudentAid),
      Fine: parseInt(formData.Fine),
      Other: parseInt(formData.Other),
    };

    // Calculate total sum
    let totalSum = 0;
    for (const field in formDataWithInt) {
      if (!isNaN(formDataWithInt[field])) {
        totalSum += formDataWithInt[field];
      }
    }

    console.log("Total sum:", totalSum);

    // console.log("Total fees:", totalFees);
    tableData1 = [
      ["Name", `${formData.FullName}`],
      ["Mobile Number", `${formData.MobileNumber}`],
      ["Class", `${formData.Year}`], //third year
      ["MIS", `${formData.Mis}`],
      ["Branch", `${formData.Branch}`],
      ["Category", `${formData.Category}`],
      ["Date of Payment", `${currentDate}`],
    ];

    tableData2 = [
      ["Particulars", "Amount"],
      ["Tuition Fee", `${formData.TutionFee}`],
      ["Development Fee", `${formData.DevelopmentFee}`],
      ["Gymkhana Fee", `${formData.GymkhanaFee}`],
      ["Training and Placement", `${formData.TnpFee}`],
      ["Library", `${formData.Library}`],
      ["Laboratoty", `${formData.Laboratory}`],
      ["Internet and Email", `${formData.InternetAndEmail}`],
      ["Gathering", `${formData.Gathering}`],
      ["C. M. D. (Refundable)", `${formData.Cmd}`],
      ["Boat Club Fee", `${formData.BoatClubFee}`],
      ["Boat Club Membership", `${formData.BoatClubMemFee}`],
      ["Student Aid Fund", `${formData.StudentAidFund}`],
      ["Examination Fee", `${formData.ExamFee}`],
      ["Identity Card", `${formData.IdentityCard}`],
      ["University Fee", `${formData.UniversityFee}`],
      ["Alumni Membership Fee", `${formData.AluminiFee}`],
      ["Hostel Fee", `${formData.HostelFee}`],
      ["Hostel Deposit", `${formData.HostelDepost}`],
      ["ARAI Fee", `${formData.AraiLibFee}`],
      ["Leaving Certificate / Transfer Certificate", `${formData.LeavingCert}`],
      ["Student Accident Insurance Premium", `${formData.StudentAid}`],
      ["Fine", `${formData.Fine}`],
      ["Others", `${formData.Other}`],
      ["Total", `${totalSum}`],
    ];

    tableData3 = [
      ["Payment", "Ref. No.", "Date", "Amount"],
      ["DU", "", "", ""],
      ["DU", "", "", ""],
      ["DU", "", "", ""],
      ["", "", "Total", ""],
    ];

    tableData4 = [
      ["Bank Name", "D.D No.", "Date", "Amount"],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "Total", ""],
    ];
    // studentDetails = {};
    // await fetchData(studentData, res);

    const doc = new PDFDocument({ size: "A3" });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="table_example.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(11);
    const table1 = {
      headers: tableData1[0],
      rows: tableData1.slice(1),
    };

    const table2 = {
      headers: tableData2[0],
      rows: tableData2.slice(1),
    };

    const table3 = {
      headers: tableData3[0],
      rows: tableData3.slice(1),
    };

    const table4 = {
      headers: tableData4[0],
      rows: tableData4.slice(1),
    };

    doc.image(cwd + "/routes/COEP_Logo.png", {
      width: 40,
      height: 40,
      x: 230,
      y: 45,
    });

    doc.image(cwd + "/routes/Images/greenTick.png", {
      width: 50,
      height: 50,
      x: 700,
      y: 1050,
      opacity: 0.01,
    });

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("COEP TECHNOLOGICAL UNIVERSITY, PUNE", 90, 50, { align: "center" });

    doc
      // .fontSize(14)
      .font("Helvetica")
      .text("5, Wellesly Road, Shivajinagar, Pune 411005", 90, 70, {
        align: "center",
      });

    doc
      // .fontSize(15)
      .font("Helvetica-Bold")
      .text("Fee Receipt", 60, 330, { align: "center" });

    doc
      // .fontSize(15)
      .font("Helvetica-Bold")
      .text("Online Payment Details", 170, 900, { align: "left" });

    doc
      // .fontSize(15)
      .font("Helvetica-Bold")
      .text("Demand Draft Payment", 450, 900, { align: "center" });

    doc
      // .fontSize(15)
      .font("Helvetica-Bold")
      .text("Student Details", 60, 120, { align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`Name - Chinmay Milind Sheth`, 90, 200, {align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`Mobile Number - 9273606333`, 90, 220, {align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`Class - Second Year BTech`, 90, 240, {align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`MIS Number - 142203003`, 90, 260, {align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`Branch - Computer Engineering`, 90, 280, {align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`Category - EWS`, 90, 300, {align: "center" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(`Date of Payment - ${currentDate}`, 90, 320, {align: "center" });

    doc
      .font("Helvetica-Bold")
      .text(`Place : Pune`, 50, 1050, { align: "Left" });

    doc
      .font("Helvetica-Bold")
      .text(`Date: ${currentDate}`, 50, 1070, { align: "left" });

    doc
      .font("Helvetica-Bold")
      .text(`Digitally Signed By`, 90, 1050, { align: "right" });

    doc.font("Helvetica").text(`Pratyay Dhond`, 90, 1070, { align: "right" });

    doc
      // .fontSize(12)
      .font("Helvetica-Bold")
      .text(`Date: ${formattedDateTime}`, 90, 1090, { align: "right" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(
    //     `Note: Please retain this copy till pass out from college.`,
    //     50,
    //     900,
    //     { align: "center" }
    //   );

    // Draw the table
    drawTable1(doc, table1, {
      x: 50,
      y: 140,
      padding: 5,
      lineSpace: 3,
      colWidths: [365, 365],
    });

    drawTable2(doc, table2, {
      x: 50,
      y: 350,
      padding: 5,
      lineSpace: 3,
      colWidths: [365, 365],
    });

    drawTable2(doc, table3, {
      x: 50,
      y: 920,
      padding: 5,
      lineSpace: 3,
      colWidths: [87, 87, 87, 87],
    });

    drawTable2(doc, table4, {
      x: 430,
      y: 920,
      padding: 5,
      lineSpace: 3,
      colWidths: [85, 85, 85, 85],
    });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

// Function to draw a table in the PDF document with custom column widths and alignments
function drawTable1(doc, table, options) {
  let { x, y, padding, lineSpace, colWidths } = options;
  const rowHeight = 18;

  doc.font("Helvetica");
  doc.fontSize(11);

  // Draw table headers with custom column widths
  table.headers.forEach((header, i) => {
    doc.rect(x, y, colWidths[i], rowHeight + lineSpace).stroke();
    doc.text(header, x + padding, y + padding, {
      width: colWidths[i] - 2 * padding,
      //align: "left",
      align: i === 1 ? "center" : "left",
    });
    x += colWidths[i];
  });

  doc.font("Helvetica");
  doc.fontSize(11);

  // Draw table rows with custom column widths and alignments
  let yOffset = y + rowHeight + lineSpace;
  table.rows.forEach((row, rowIndex) => {
    let xOffset = x - colWidths.reduce((acc, val) => acc + val, 0);
    row.forEach((cell, i) => {
      const align = i === 1 ? "center" : "left"; // Align 'Course Name' column to the left

      doc.rect(xOffset, yOffset, colWidths[i], rowHeight + lineSpace).stroke();
      if (rowIndex === table.rows.length - 1) {
        // Change 3 to the index of the row you want to make bold
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      } else {
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      }
      xOffset += colWidths[i];
    });
    yOffset += rowHeight + lineSpace;
  });

  // Draw outer table border
  const tableWidth = colWidths.reduce((acc, val) => acc + val, 0);
  const tableHeight =
    rowHeight * (table.rows.length + 1) + lineSpace * table.rows.length;
  doc.rect(x - tableWidth, y, tableWidth, tableHeight + lineSpace).stroke();
}

function drawTable2(doc, table, options) {
  let { x, y, padding, lineSpace, colWidths } = options;
  const rowHeight = 18;

  doc.font("Helvetica-Bold");
  doc.fontSize(11);

  // Draw table headers with custom column widths
  table.headers.forEach((header, i) => {
    doc.rect(x, y, colWidths[i], rowHeight + lineSpace).stroke();
    doc.text(header, x + padding, y + padding, {
      width: colWidths[i] - 2 * padding,
      align: "center",
    });
    x += colWidths[i];
  });

  doc.font("Helvetica");
  doc.fontSize(11);

  // Draw table rows with custom column widths and alignments
  let yOffset = y + rowHeight + lineSpace;
  table.rows.forEach((row, rowIndex) => {
    let xOffset = x - colWidths.reduce((acc, val) => acc + val, 0);
    row.forEach((cell, i) => {
      const align = i === 1 ? "center" : "left"; // Align 'Course Name' column to the left

      doc.rect(xOffset, yOffset, colWidths[i], rowHeight + lineSpace).stroke();
      if (rowIndex === table.rows.length - 1) {
        // Change 3 to the index of the row you want to make bold
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      } else {
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      }
      xOffset += colWidths[i];
    });
    yOffset += rowHeight + lineSpace;
  });

  // Draw outer table border
  const tableWidth = colWidths.reduce((acc, val) => acc + val, 0);
  const tableHeight =
    rowHeight * (table.rows.length + 1) + lineSpace * table.rows.length;
  doc.rect(x - tableWidth, y, tableWidth, tableHeight + lineSpace).stroke();
}

// router.post("/sendBonafideRequest", async (req, res) => {
//   const { mis, name, dept, programme, purpose, year, academicYear } = req.body;
//   try {
//     // console.log("FORMDATA : ",formData,mis);
//     // Create a new Bonafide document
//     const newBonafide = new Bonafide({
//       mis,
//       name,
//       dept,
//       year,
//       academicYear,
//       programme,
//       purpose,
//     });

//     // Save the new Bonafide document to the database
//     const result = await newBonafide.save();

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/LeavingCertificate", async (req, res) => {
  const formData = {
    FullName: "Chinmay Milind Sheth",
    Religion: "Hindu",
    Caste: "Gujar",
    Nationality: "Indian",
    PlaceOfBirth: "Mahad",
    DateOfBirth: "17/06/2003",
    LastAttended: "Institute of Petrochemical Engineering, Lonere",
    DateOfAdmission: "28/11/2022",
    Progress: "Good",
    Conduct: "Good",
    DateofLeave: "15/06/2025",
    Remarks: "No Dues",
  };
  try {
    const studentData = req.body;
    const currentDateTime = new Date();
    const formattedDateTime = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");
    const currentDate = format(new Date(), "dd/MM/yyyy");
    console.log(req.body);
    const cwd = process.cwd();

    tableData1 = [
      ["1.", "Name of the Student", `${formData.FullName}`],
      ["2.", "Religion", `${formData.Religion}`],
      ["3.", "Caste", `${formData.Caste}`],
      ["3.", "Nationality", `${formData.Nationality}`],
      ["4.", "Place of Birth", `${formData.PlaceOfBirth}`],
      ["5.", "Date of Birth", `${formData.DateOfBirth}`],
      ["6.", "Institute/College Last Attended", `${formData.LastAttended}`],
      ["7.", "Date of Admission", `${formData.DateOfAdmission}`],
      ["8.", "Progress", `${formData.Progress}`],
      ["9.", "Conduct", `${formData.Conduct}`],
      ["10.", "Date of Leaving the University", `${formData.DateofLeave}`],
      ["11.", "Remarks", `${formData.Remarks}`],
    ];

    // studentDetails = {};
    // await fetchData(studentData, res);

    const doc = new PDFDocument({ size: "A4" });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="table_example.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(11);
    const table1 = {
      headers: tableData1[0],
      rows: tableData1.slice(1),
    };

    doc.image(cwd + "/routes/COEP_Logo.png", {
      width: 40,
      height: 40,
      x: 80,
      y: 45,
    });

    doc.image(
      // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/watermark.png",
      cwd + "/routes/watermark.png",
      {
        width: 400,
        height: 500,
        x: 100,
        y: 200,
        opacity: 0.01,
      }
    );

    doc.image(cwd + "/routes/Images/greenTick.png", {
      width: 50,
      height: 50,
      x: 450,
      y: 720,
      opacity: 0.1,
    });

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .text("COEP TECHNOLOGICAL UNIVERSITY, PUNE", 110, 50, {
        align: "center",
      });

    doc
      .fontSize(14)
      .font("Helvetica")
      .text("5, Wellesly Road, Shivajinagar, Pune 411005", 110, 75, {
        align: "center",
      });

    doc.rect(185, 100, 245, 40);
    doc.stroke();

    doc.rect(20, 20, 555, 750);
    doc.stroke();

    doc.rect(20, 190, 555, 0);
    doc.stroke();

    doc.rect(20, 195, 555, 0);
    doc.stroke();

    doc
      .fontSize(25)
      .font("Helvetica-Bold")
      .text("Leaving Certificate", 90, 110, { align: "center" });

    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(`Sr. No. : 1019`, 50, 170, { align: "left" });

    doc
      .font("Helvetica-Bold")
      .text(`Register No. : Comp/08/59`, 50, 170, { align: "right" });

    doc
      .fontSize(11)
      .font("Helvetica")
      .text(
        "Note: No change in any entry in this Leaving Certificate is to be made except by the authority issuing this Leaving Certificate, Infringement of this rule will be punished with rustication.",
        30,
        205,
        { align: "left" }
      );

    // doc
    //   // .fontSize(15)
    //   .font("Helvetica")
    //   .text("Note: Certified that the above information is in the accordance with the University Register.", 50, 680, { align: "center" });

    // doc
    //   // .fontSize(15)
    //   .font("Helvetica-Bold")
    //   .text("Student Details", 60, 120, { align: "center" });

    doc.font("Helvetica-Bold").text(`Place : Pune`, 50, 720, { align: "Left" });

    doc
      .font("Helvetica-Bold")
      .text(`Date: ${currentDate}`, 50, 740, { align: "left" });

    doc
      .font("Helvetica-Bold")
      .text(`Digitally Signed By`, 50, 710, { align: "right" });

    doc.font("Helvetica").text(`Registrar`, 10, 730, { align: "right" });

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(`Date: ${formattedDateTime}`, 90, 750, { align: "right" });

    // doc
    //   .font("Helvetica-Bold")
    //   .text(
    //     `Note: Please retain this copy till pass out from college.`,
    //     50,
    //     900,
    //     { align: "center" }
    //   );

    // Draw the table
    drawTable1(doc, table1, {
      x: 20,
      y: 240,
      padding: 5,
      lineSpace: 3,
      colWidths: [50, 230, 275],
    });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

// Function to draw a table in the PDF document with custom column widths and alignments
function drawTable1(doc, table, options) {
  let { x, y, padding, lineSpace, colWidths } = options;
  const rowHeight = 35;

  doc.font("Helvetica");
  doc.fontSize(15);

  // Draw table headers with custom column widths
  table.headers.forEach((header, i) => {
    doc.rect(x, y, colWidths[i], rowHeight + lineSpace).stroke();
    doc.text(header, x + padding, y + padding, {
      width: colWidths[i] - 2 * padding,
      //align: "left",
      align: i === 1 ? "left" : "left",
    });
    x += colWidths[i];
  });

  doc.font("Helvetica");
  doc.fontSize(15);

  // Draw table rows with custom column widths and alignments
  let yOffset = y + rowHeight + lineSpace;
  table.rows.forEach((row, rowIndex) => {
    let xOffset = x - colWidths.reduce((acc, val) => acc + val, 0);
    row.forEach((cell, i) => {
      const align = i === 1 ? "left" : "left"; // Align 'Course Name' column to the left

      doc.rect(xOffset, yOffset, colWidths[i], rowHeight + lineSpace).stroke();
      if (rowIndex === table.rows.length - 1) {
        // Change 3 to the index of the row you want to make bold
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      } else {
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      }
      xOffset += colWidths[i];
    });
    yOffset += rowHeight + lineSpace;
  });

  // Draw outer table border
  const tableWidth = colWidths.reduce((acc, val) => acc + val, 0);
  const tableHeight =
    rowHeight * (table.rows.length + 1) + lineSpace * table.rows.length;
  doc.rect(x - tableWidth, y, tableWidth, tableHeight + lineSpace).stroke();
}

function drawTable2(doc, table, options) {
  let { x, y, padding, lineSpace, colWidths } = options;
  const rowHeight = 18;

  doc.font("Helvetica-Bold");
  doc.fontSize(11);

  // Draw table headers with custom column widths
  table.headers.forEach((header, i) => {
    doc.rect(x, y, colWidths[i], rowHeight + lineSpace).stroke();
    doc.text(header, x + padding, y + padding, {
      width: colWidths[i] - 2 * padding,
      align: "center",
    });
    x += colWidths[i];
  });

  doc.font("Helvetica");
  doc.fontSize(11);

  // Draw table rows with custom column widths and alignments
  let yOffset = y + rowHeight + lineSpace;
  table.rows.forEach((row, rowIndex) => {
    let xOffset = x - colWidths.reduce((acc, val) => acc + val, 0);
    row.forEach((cell, i) => {
      const align = i === 1 ? "center" : "left"; // Align 'Course Name' column to the left

      doc.rect(xOffset, yOffset, colWidths[i], rowHeight + lineSpace).stroke();
      if (rowIndex === table.rows.length - 1) {
        // Change 3 to the index of the row you want to make bold
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      } else {
        doc
          .font("Helvetica")
          .text(cell.toString(), xOffset + padding, yOffset + padding, {
            width: colWidths[i] - 2 * padding,
            align,
          });
      }
      xOffset += colWidths[i];
    });
    yOffset += rowHeight + lineSpace;
  });

  // Draw outer table border
  const tableWidth = colWidths.reduce((acc, val) => acc + val, 0);
  const tableHeight =
    rowHeight * (table.rows.length + 1) + lineSpace * table.rows.length;
  doc.rect(x - tableWidth, y, tableWidth, tableHeight + lineSpace).stroke();
}

router.post("/fillFeeReceit", async (req, res) => {
  try {
    // Parse request body to extract data
    const {
      FullName,
      Year,
      MobileNumber,
      Mis,
      Branch,
      Category,
      DateOfPayment,
      TutionFee,
      DevelopmentFee,
      GymkhanaFee,
      TnpFee,
      Library,
      Laboratory,
      InternetAndEmail,
      Gathering,
      Cmd,
      BoatClubFee,
      BoatClubMemFee,
      StudentAidFund,
      ExamFee,
      IdentityCard,
      UniversityFee,
      AluminiFee,
      HostelFee,
      HostelDepost,
      AraiLibFee,
      AraiCompFee,
      AraiLabFee,
      AraiAluminiFee,
      LeavingCert,
      StudentAid,
      Fine,
      Other,
      uploadSbiFee,
    } = req.body;

    // Create a new document using the AcademicProfile schema
    const feereceitt = new FeeReceipt({
      FullName,
      Year,
      MobileNumber,
      Mis,
      Branch,
      Category,
      DateOfPayment,
      TutionFee,
      DevelopmentFee,
      GymkhanaFee,
      TnpFee,
      Library,
      Laboratory,
      InternetAndEmail,
      Gathering,
      Cmd,
      BoatClubFee,
      BoatClubMemFee,
      StudentAidFund,
      ExamFee,
      IdentityCard,
      UniversityFee,
      AluminiFee,
      HostelFee,
      HostelDepost,
      AraiLibFee,
      AraiCompFee,
      AraiLabFee,
      AraiAluminiFee,
      LeavingCert,
      StudentAid,
      Fine,
      Other,
      uploadSbiFee,
    });

    // Save the new document to the database
    const data = await feereceitt.save();
    // res.status(201).json({ message: "Fee Receit Data Saved successfully" });
    res.send(data);
  } catch (error) {
    console.error("Error saving academic profile:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

router.post("/FillLeaving", async (req, res) => {
  try {
    // Parse request body to extract data
    const {
      FullName,
      Religion,
      Caste,
      Nationality,
      DateOfBirth,
      PlaceOfBirth,
      LastSchoolAttended,
      DateOfAdmission,
      Progress,
      Conduct,
      DateofLeaving,
      Remarks,
    } = req.body;

    // Create a new document using the AcademicProfile schema
    const FillLeaving = new FillLeaving({
      FullName,
      Religion,
      Caste,
      Nationality,
      DateOfBirth,
      PlaceOfBirth,
      LastSchoolAttended,
      DateOfAdmission,
      Progress,
      Conduct,
      DateofLeaving,
      Remarks,
    });

    // Save the new document to the database
    const data = await FillLeaving.save();
    // res.status(201).json({ message: "Fee Receit Data Saved successfully" });
    res.send(data);
  } catch (error) {
    console.error("Error saving academic profile:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

/*
document.getElementById("mis").value = "142203012"
document.getElementById("password").value = "password123"
*/

async function publishSubjectsToDB(userData) {
  const semesters = userData["academicprofiles"]["semesters"];
  semesterSubjectKeys = [];
  for (var i = 0; i < semesters.length; i++) {
    var currentSubjectArray = semesters[i]["subjects"];
    var subjectKeys = [];
    for (var j = 0; j < currentSubjectArray.length; j++) {
      var currentSubject = currentSubjectArray[j];
      for (var k = 0; k < currentSubjectArray[j]["subjects"].length; k++) {
        var key = await addDocumentToCollection(
          currentSubjectArray[j]["subjects"][k],
          "test",
          "subjects"
        );
        subjectKeys.push(key.insertedId);
      }
    }
    semesterSubjectKeys.push(subjectKeys);
  }
  console.log(semesterSubjectKeys);
  return semesterSubjectKeys;
}

async function publishAcademicDetailsToDB(userData, semesterSubjectKeys) {
  // Insert academicDetails
  var academicProfileData = userData["academicprofiles"];
  console.log(academicProfileData);

  for (var i = 0; i < semesterSubjectKeys.length; i++) {
    academicProfileData["semesters"][i]["subjects"][0]["subjects"] = [];
    academicProfileData["semesters"][i]["subjects"][0]["subjects"] =
      semesterSubjectKeys[i];
  }
  var academicProfileKey = await addDocumentToCollection(
    academicProfileData,
    "test",
    "academicprofiles"
  );
  console.log(academicProfileData);
  console.log(academicProfileKey.insertedId);
  return academicProfileKey.insertedId;
}

async function publishStudentDetailsToDB(userData) {
  // Insert Student Details

  var studentDetailsData = userData["studentinformations"];
  console.log(studentDetailsData);
  var studentInformationKey = await addDocumentToCollection(
    studentDetailsData,
    "test",
    "studentinformations"
  );
  console.log(studentInformationKey.insertedId);
  return studentInformationKey.insertedId;
}

async function publishStudentDataToDB(
  userData,
  academicProfileKey,
  studentInformationKey
) {
  // insert to the first instance Document :
  var studentData = userData;
  studentData["studentinformations"] = studentInformationKey;
  studentData["academicprofiles"] = academicProfileKey;
  var studentKey = await addDocumentToCollection(
    studentData,
    "test",
    "students"
  );
  console.log(studentKey.insertedId);
  return studentKey.insertedId;
}

router.post("/postToDB", async (req, res) => {
  // const id = req.student.id;
  try {
    const { userData } = req.body;
    // console.log(userData)
    res.json({ message: "hi" });

    var semesterSubjectKeys = await publishSubjectsToDB(userData);
    var academicProfileKey = await publishAcademicDetailsToDB(
      userData,
      semesterSubjectKeys
    );
    var studentInformationKey = await publishStudentDetailsToDB(userData);

    // the following key would not be needed tho as MIS would be the PK for accessing the values
    var userDataUploadAccessKey = await publishStudentDataToDB(
      userData,
      academicProfileKey,
      studentInformationKey
    );
    console.log(userDataUploadAccessKey);
  } catch (err) {
    console.log(err);
  }
});

router.post("/sendScholarshipRequest", async(req, res) => {
  try {
    const data = req.body;
    connectToAtlas();
    addDocumentToCollection(data, "test", "ScholarshipRequests");
    res.send("Request Sent");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

router.post("/sendBonafideRequest", async(req, res) => {
  try {
    const data = req.body;
    connectToAtlas();
    addDocumentToCollection(data, "test", "BonafideRequests");
    res.send("Request Sent");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

router.post("/sendFeeReceiptRequest", async(req, res) => {
  try {
    const data = req.body;
    connectToAtlas();
    addDocumentToCollection(data, "test", "FeeReceiptRequests");
    res.send("Request Sent");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

router.post("/sendLCRequest", async(req, res) => {
  try {
    const data = req.body;
    connectToAtlas();
    addDocumentToCollection(data, "test", "LCRequests");
    res.send("Request Sent");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router;
