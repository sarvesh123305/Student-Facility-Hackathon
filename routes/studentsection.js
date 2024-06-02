const express = require("express");
const router = express.Router(); //so now we dont need app.get
const { check, validationResult } = require("express-validator");
const { genSalt, hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const Other = require("../models/Others");
const Messages = require("../models/Messages");
const { MongoClient } = require("mongodb");
const FeeReceipt = require("../models/FeeReceipt");
const Bonafide = require("../models/Bonafide");
const c = require("config");
const uri =
  "mongodb+srv://sarveshkulkarni2106:123@contactkeeper.jkrszl5.mongodb.net/?retryWrites=true&w=majority&appName=Contactkeeper"; // MongoDB Atlas connection URI
const client = new MongoClient(uri);

// const Message = require("../models/Messages");
//@routes POST api/others
//@desc Register to a others;
//@access public
async function connectToAtlas() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

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

router.post("/bonafideApplications", async (req, res) => {
  try {
    const { mis } = req.body;
    const bonafideApplications = await Bonafide.findOne({ mis });
    if (bonafideApplications)
      return res.json({ msg: "Bonafide Application Found" });

    res.json({ msg: "No Bonafide Application Found" });
  } catch (err) {
    res.status(500).send("Server error occurred");
  }
});

router.post("/FeeReceitApplications", async (req, res) => {
  try {
    const { mis } = req.body;
    // Fetch all bonafide applications from the collection

    const feeReceit = await FeeReceipt.findOne({ mis });
    if (!feeReceit) return res.json({ msg: "No Fee Receipts found" });

    // Return the bonafide applications as JSON response
    res.json({ msg: "Fee Receipts found" });
  } catch (err) {
    // Log and send an error response if an error occurs
    console.error("Error  Fee Receipt applications:", err.message);
    res.status(500).send("Server error occurred");
  }
});
//@routes POST api/faculty/bonafideApproval
//@desc Approve to reject bonafide
//@access public

router.put("/bonafideApproval", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Bad request
  }

  try {
    const { mis, status } = req.body;
    console.log("MIS<STUA", mis, status);

    // Update the status of the bonafide document
    const updatedBonafide = await Bonafide.findOneAndUpdate(
      { mis },
      { status },
      { new: true }
    );

    if (!updatedBonafide) {
      return res.status(404).json({ msg: "No document found" });
    }

    res.json(updatedBonafide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error occurred");
  }
});

router.post("/sendReply", async (req, res) => {
  try {
    const data = req.body;
    connectToAtlas();
    addDocumentToCollection(data, "test", "Replies");
    res.send("Request Sent");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/getReplies", async (req, res) => {
  try {
    // get alloted elective from the respective database
    connectToAtlas();
    getAllDocumentsFromCollection("test", "Replies")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getBonafideRequests", async (req, res) => {
  try {
    // get alloted elective from the respective database
    connectToAtlas();
    getAllDocumentsFromCollection("test", "BonafideRequests")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getLCRequests", async (req, res) => {
  try {
    // get alloted elective from the respective database
    connectToAtlas();
    getAllDocumentsFromCollection("test", "LCRequests")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getScholarshipRequests", async (req, res) => {
  try {
    // get alloted elective from the respective database
    connectToAtlas();
    getAllDocumentsFromCollection("test", "ScholarshipRequests")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getFeeReceiptRequests", async (req, res) => {
  try {
    // get alloted elective from the respective database
    connectToAtlas();
    getAllDocumentsFromCollection("test", "FeeReceiptRequests")
      .then((documents) => {
        res.send(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getQueries", async (req, res) => {
  try {
    // get alloted elective from the respective database
    connectToAtlas();
    getAllDocumentsFromCollection("test", "Queries")
      .then((documents) => {
        res.json(documents);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/queries/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    console.log(messageId);
    // Check if message exists
    const message = await Messages.findOne({ messageId });
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Delete the message
    await Messages.deleteOne({ messageId });

    // Return success message
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateLCRequest/:mis", async (req, res) => {
  const { mis } = req.params;

  const data = req.body;

  try {
    const db = client.db("test");

    const collection = db.collection("LCRequests");

    const result = await collection.updateOne({ mis: mis }, { $set: data });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateScholarshipRequest/:mis", async (req, res) => {
  const { mis } = req.params;

  const data = req.body;

  try {
    const db = client.db("test");

    const collection = db.collection("ScholarshipRequests");

    const result = await collection.updateOne({ mis: mis }, { $set: data });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateFeeReceiptRequest/:mis", async (req, res) => {
  const { mis } = req.params;

  const data = req.body;

  try {
    const db = client.db("test");

    const collection = db.collection("FeeReceiptRequests");

    const result = await collection.updateOne({ mis: mis }, { $set: data });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updateQuery/:from", async (req, res) => {
  const { from } = req.params;

  const newData = req.body;
  try {
    const db = client.db("test");
    const collection = db.collection("Queries");
    console.log("hello");
    const result = await collection.updateOne(
      { from: from },
      { $set: newData }
    );

    res.json({ message: "Document updated successfully", result });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
