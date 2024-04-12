const mongoose = require("mongoose");

const FeeReceipt = mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  MobileNumber: {
    type: String,
    required: true,
  },
  Mis: {
    type: Number,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  DateOfPayment: {
    type: Date,
    required: true,
  },
  TutionFee: {
    type: Number,
    required: true,
  },
  DevelopmentFee: {
    type: Number,
    required: true,
  },
  GymkhanaFee: {
    type: Number,
    required: true,
  },
  TnpFee: {
    type: Number,
    required: true,
  },
  Library: {
    type: Number,
    required: true,
  },
  Laboratory: {
    type: Number,
    required: true,
  },
  InternetAndEmail: {
    type: Number,
    required: true,
  },
  Gathering: {
    type: Number,
    required: true,
  },
  Cmd: {
    type: Number,
    required: true,
  },
  BoatClubFee: {
    type: Number,
    required: true,
  },
  BoatClubMemFee: {
    type: Number,
    required: true,
  },
  StudentAidFund: {
    type: Number,
    required: true,
  },
  ExamFee: {
    type: Number,
    required: true,
  },
  IdentityCard: {
    type: Number,
    required: true,
  },
  UniversityFee: {
    type: Number,
    required: true,
  },
  AluminiFee: {
    type: Number,
    required: true,
  },
  HostelFee: {
    type: Number,
    required: true,
  },
  HostelDepost: {
    type: Number,
    required: true,
  },
  AraiLibFee: {
    type: Number,
    required: true,
  },
  AraiCompFee: {
    type: Number,
    required: true,
  },
  AraiLabFee: {
    type: Number,
    required: true,
  },
  AraiAluminiFee: {
    type: Number,
    required: true,
  },
  LeavingCert: {
    type: Number,
    required: true,
  },
  StudentAid: {
    type: Number,
    required: true,
  },
  Fine: {
    type: Number,
    required: true,
  },
  Other: {
    type: Number,
    required: true,
  },
  uploadSbiFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("FeeReceipt", FeeReceipt);
