const mongoose = require("mongoose");

const StudentInformationSchema = mongoose.Schema({
  MIS: {
    type: Number,
    required: true,
    unique: true,
  },
  ProfilePhoto: {
    type: Number,
    required: true,
  },
  PersonalInformation: {
    Name: {
      type: String,
      required: true,
    },
    Department: String,
    Branch: String,
    CourseLevel: String,
    DateOfAdmission: Date,
    COEPEmail: String,
    GMeritNo: String,
  },
  FamilyInformation: {
    FatherName: String,
    MotherName: String,
    ParentsContact: String,
    FatherOccupation: String,
    LocalGuardianName: String,
    LocalGuardianNo: String,
  },
  ContactInformation: {
    PermanentAdd: String,
    City: String,
    District: String,
    State: String,
    Country: String,
    Pincode: String,
    TemporaryAdd: String,
    StudentMobile: String,
  },
});

module.exports = mongoose.model("StudentInformation", StudentInformationSchema);
