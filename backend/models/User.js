const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true }, 
  mobileno: { type: String, required: true },
  Designation: { type: String },
  gender: { type: String },
  Course: { type: [String] }, 
  ImgUpload: { type: String }, 
});


const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel; 
