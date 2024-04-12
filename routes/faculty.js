const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const { genSalt, hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Faculty = require("../models/Faculty");
const auth = require("../middleware/auth")

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://sarveshkulkarni2106:123@contactkeeper.jkrszl5.mongodb.net/?retryWrites=true&w=majority&appName=Contactkeeper'; // MongoDB Atlas connection URI
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
async function connectToAtlas() {
  try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
  } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
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


router.get("/elective/results/:dbName", async (req, res) =>  {

    try {
      // get alloted elective from the respective database
      const dbName = req.params.dbName;
      connectToAtlas();
      getAllDocumentsFromCollection(dbName, "Results")
              .then(documents => {
                  res.json(documents)
              })
              .catch(error => {
                  console.error('Error fetching documents:', error);
              });
  
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }

    // await client.close()

});

router.get("/elective/responses/:dbName", async (req, res) =>  {

  try {
    const dbName = req.params.dbName;
    connectToAtlas();
    getAllDocumentsFromCollection(dbName, "Responses")
            .then(documents => {
                res.json(documents)
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
            });
  } 
  catch (error) {
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
      console.log('Collection created in MongoDB Atlas:', collectionName);
  } catch (error) {
      console.error('Error creating collection in MongoDB Atlas:', error);
  }
}

async function addDocumentToCollection(document, dbName, collectionName) {
  try {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const result = await collection.insertOne(document);
      console.log('Document added to collection:', result.insertedId);
  } catch (error) {
      console.error('Error adding document to collection:', error);
  }
}


router.post("/elective", async (req, res) =>  {

try {
  
  const preferences = req.body;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  let db = preferences['NameOfSubject'] + " " +  currentYear;

  const dbName = db.replace(/\s+/g, '_');

  connectToAtlas();
  createCollectionInAtlas(dbName, "Details")
  addDocumentToCollection(preferences, dbName, "Details")
  createCollectionInAtlas(dbName, "Responses")
  createCollectionInAtlas(dbName, "Results")

  res.json(preferences['NameOfSubject']);

} catch (error) {
  res.status(500).send("Internal Server Error");
}
});

router.get("/allotElective/:dbName", async(req, res) => {

  try {
    const dbName = req.params.dbName;
    await initAllotment(dbName)
    res.send("Successfully Fetched")

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

});

function sumDictionaryValues(dict) {
  let sum = 0;
  const values = Object.values(dict);
  for (const value of values) {
    if (typeof value === 'number') {
      sum += value;
    }
  }
  return sum;
}
const Seats ={ WST: 2, SP: 2, ADS: 2}
const total = sumDictionaryValues(Seats)

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
  for(const student of data){
    console.log(student)
    console.log('-----------------------------------')
  }

  // Elective Allocation code should be placed heret
};

async function allotElective(documents, dbName, studentCollection){

try {
  const students = []
  const database = client.db("Student")
  for (const document of documents) {
    const student = await database.collection(studentCollection).findOne({ MIS: document.MIS });
    student['Preferences'] = document['Preferences']
    student['NameOfSubject'] = dbName
    students.push(student)
  }

  // for(const student of students){
  //   console.log(student)
  //   console.log('-----------------------------------')
  // }
  allocateSubjects(students)


}
catch (error) {
  console.error('Error fetching data:', error);
} finally {
  await client.close();
}
}
async function initAllotment(dbName){
  connectToAtlas();
  getAllDocumentsFromCollection(dbName, "Responses")
          .then(documents => {
              allotElective(documents, dbName, "CS3")
          })
          .catch(error => {
              console.error('Error fetching documents:', error);
          });
}

module.exports = router;
