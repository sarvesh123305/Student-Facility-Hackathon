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

const StudentInformation = require("../models/StudentInformation");

const fs = require("fs");

const PDFDocument = require("pdfkit");
const axios = require("axios");
const { format } = require("date-fns");

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

function generateBonafide() {}

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
      doc.font("Times-Bold").text(`${currentYear[year - 1]}`, 240, 330);
      doc.font("Times-Roman").text(`Year`, 290, 330);
      doc.font("Times-Bold").text(`${programme}`, 330, 330);
      doc.font("Times-Roman").text(`in`, 390, 330);
      doc.font("Times-Bold").text(`${dept}`, 410, 330);
      doc.font("Times-Roman").text(`during the Year`, 590, 330);

      doc.font("Times-Bold").text(`${academicYear}. `, 60, 360);
      doc.font("Times-Bold").text(`His/ Her`, 150, 360);
      doc.font("Times-Roman").text(`MIS No.`, 220, 360);
      doc.font("Times-Bold").text(`${mis}.`, 285, 360);
      doc
        .font("Times-Roman")
        .text(`This certificate is issued for the purpose of `, 100, 390);
      doc.font("Times-Bold").text(`${purpose}.`, 410, 390);

      doc.image(
        // "/home/sohel/COEP/SEM-VI/SE-II/Project/MIS-Portal/routes/coepStamp.png",
        cwd + "/routes/coepStamp.png",

        {
          width: 150, // Set the width of the image
          height: 150, // Fit the image into a 100x100 box
          x: 250,
          y: 450,
        }
      );

      doc.font("Times-Roman").text(`Registrar`, 560, 490);
      doc
        .font("Times-Roman")
        .text(`COEP Technological University, Pune`, 430, 510);

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
      console.log("Request is ", mis);
      const studentDetails = await Student.findOne({ _id: mis });
      if (!studentDetails)
        return res.status(404).json({ message: "Student not found" });
      console.log(studentDetails);
      console.log(studentDetails.studentInformation);
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

module.exports = router;
/*
document.getElementById("mis").value = "142203012"
document.getElementById("password").value = "password123"
*/
