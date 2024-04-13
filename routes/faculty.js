const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const { genSalt, hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Faculty = require("../models/Faculty");
const auth = require("../middleware/auth");
const Notifications = require("../models/Notifications");
const Marks = require("../models/Marks");

const { MongoClient } = require("mongodb");
const AcademicProfile = require("../models/AcademicProfile");

const uri =
  "mongodb+srv://sarveshkulkarni2106:123@contactkeeper.jkrszl5.mongodb.net/?retryWrites=true&w=majority&appName=Contactkeeper"; // MongoDB Atlas connection URI
const client = new MongoClient(uri);

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
    const { name, empno, password, department, assignedSubjects } = req.body;
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
        assignedSubjects, // Add assignedSubjects to the new faculty member
      });
      const salt = await genSalt(10); // 10 is number of rounds it takes, that is how secure it must be
      user.password = await hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 36000, // 3600 seconds i.e. 1 hour
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occurred");
    }
  }
);

async function connectToAtlas() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

async function getAllDocumentsFromCollection(dbName, col) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(col);
    const documents = await collection.find({}).toArray();
    return documents;
  } catch (error) {
    throw error;
  }
}

router.get("/elective/results/:dbName", async (req, res) => {
  try {
    // get alloted elective from the respective database
    const dbName = req.params.dbName;
    connectToAtlas();
    getAllDocumentsFromCollection(dbName, "Results")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

  // await client.close()
});

router.post("/uploadMarks", [], async (req, res) => {
  const { finalSubmitData } = req.body;
  try {
    console.log("Data", finalSubmitData);

    // Loop through each row of finalSubmitData and save to the database
    for (const data of finalSubmitData) {
      try {
        if (
          "MIS" in data &&
          "Name" in data &&
          "T1" in data &&
          "T2" in data &&
          "ESE" in data &&
          "Total" in data
        ) {
          const MIS = data.MIS;
          const Name = data.Name;
          const T1 = data.T1;
          const T2 = data.T2;
          const ESE = data.ESE;
          const Total = data.Total;

          const marks = new Marks({
            mis: MIS,
            name: Name,
            t1: T1,
            t2: T2,
            ese: ESE,
            total: Total,
          });

          // console.log("Inner Data:", marks.mis, marks.name, marks.t1, marks.t2, marks.ese, marks.total);
          // Log the entire marks object
          // console.log("Marks Object:", marks);
          const result = await marks.save();
        } else {
          console.error("Error: Missing or misspelled property in data object");
        }
      } catch (err) {
        console.error("Error saving data:", err);
      }
    }

    console.log("Data submitted");
    res.json({ msg: "Data submitted" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/elective/responses/:dbName", async (req, res) => {
  try {
    const dbName = req.params.dbName;
    connectToAtlas();
    getAllDocumentsFromCollection(dbName, "Responses")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

  // await client.close()
});

// function createSchemas(id, electivedetails){
//   const elective = new mongoose.Schema({
//     data: { type: mongoose.Schema.Types.Mixed, required: true },
// });

// }

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
    const preferences = req.body;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    let db = preferences["NameOfSubject"] + " " + currentYear;

    const dbName = db.replace(/\s+/g, "_");

    connectToAtlas();
    createCollectionInAtlas(dbName, "Details");
    addDocumentToCollection(preferences, dbName, "Details");
    createCollectionInAtlas(dbName, "Responses");
    createCollectionInAtlas(dbName, "Results");

    res.json(preferences["NameOfSubject"]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/allotElective/:dbName", async (req, res) => {
  try {
    const dbName = req.params.dbName;
    await initAllotment(dbName);
    res.send("Successfully Fetched");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

function sumDictionaryValues(dict) {
  let sum = 0;
  const values = Object.values(dict);
  for (const value of values) {
    if (typeof value === "number") {
      sum += value;
    }
  }
  return sum;
}
const Seats = { WST: 2, SP: 2, ADS: 2 };
const total = sumDictionaryValues(Seats);

const sortDataByCGPAAndSGPA = (data) => {
  return data.sort((a, b) => {
    if (parseFloat(a.CGPA) !== parseFloat(b.CGPA)) {
      return parseFloat(b.CGPA) - parseFloat(a.CGPA); // Descending order
    } else {
      return parseFloat(b.SGPA) - parseFloat(a.SGPA); // Descending order
    }
  });
};

const allocateSubjects = (data) => {
  if (data.length > total) {
    console.log("Allocation not possible");
    return;
  }
  sortDataByCGPAAndSGPA(data);
  let arr = [];
  for (const student of data) {
    console.log(student);
    console.log("-----------------------------------");
  }

  // Elective Allocation code should be placed heret
};

async function allotElective(documents, dbName, studentCollection) {
  try {
    const students = [];
    const database = client.db("Student");
    for (const document of documents) {
      const student = await database
        .collection(studentCollection)
        .findOne({ MIS: document.MIS });
      student["Preferences"] = document["Preferences"];
      student["NameOfSubject"] = dbName;
      students.push(student);
    }

    // for(const student of students){
    //   console.log(student)
    //   console.log('-----------------------------------')
    // }
    allocateSubjects(students);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await client.close();
  }
}
async function initAllotment(dbName) {
  connectToAtlas();
  getAllDocumentsFromCollection(dbName, "Responses")
    .then((documents) => {
      allotElective(documents, dbName, "CS3");
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });
}

router.post("/addNotification", async (req, res) => {
  try {
    const { message, messageType, relatedTo, mis } = req.body;
    const newNotification = new Notifications({
      message,
      relatedTo,
      mis,
    });
    await newNotification.save();
    res.status(201).send("Notification added successfully"); // 201 for created resources
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error adding notification");
  }
});

router.post("/FillMarksInSubject", async (req, res) => {
  try {
    const { empno, semesterName } = req.body;

    const resp = await Faculty.findOne({ empno });
    if (!resp) res.json({ msg: "No faculty found" });
    const students = await AcademicProfile.find();

    resp.assignedSubjects?.map((subject, index) => {
      // console.log("Subject ", subject);
      for (const student of students) {
        // Update the specified field for the student
        // student[fieldName] = fieldValue;
        // console.log(student);
        // for(const semester of )
        for (const semester of student.semesters) {
          // console.log(semester);
          if (semester.semesterName === semesterName) {
            // console.log(semester);
            // const subject = semester.subjects.find(
            //   (subject) => subject.subjectCode === "AS-21001"
            // );
            // console.log(subject);
            for (const sub of semester.subject) {
              console.log(sub);
            }
          }
        }
        // Save the updated student
        // await student.save();
      }
    });
    // console.log(resp);
    res.json({ msg: "Ds" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
