const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const port=3000;
const mongourl="mongodb://localhost:27017/users";
const app=express();
const multer=require("multer");
const path= require('path');
const upload = multer({dest: 'uploads/'});
const EmployeeModel=require("./models/User.js");
const AdminModel=require("./models/adminUser.js")
app.use(express.json());
app.use(cors());

mongoose.connect(mongourl).then(() => {
    console.log("MONGO DB CONNECTED");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});



app.post("/empcreate", upload.single('file'), (req, res) => {
    const { name, email, mobileno, Designation, gender, Course } = req.body;
    let ImgUpload="" // Extract filename from multer
    if (req.file) {
        ImgUpload = req.file.filename; // Extract filename from multer if file exists
      }
    EmployeeModel.create({ name, email, mobileno, Designation, gender, Course, ImgUpload })
      .then(result => {
        console.log("Employee created successfully:", result);
        res.json(result);
      })
      .catch(err => {
        console.error("Error creating employee:", err);
        res.status(500).json({ error: "Internal server error" }); 
      });
  });

 app.get("/employees", (req, res) => {
    EmployeeModel.find()
      .then(employees => {
        res.json(employees);
      })
      .catch(err => {
        console.error("Error fetching employees:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  });

  app.put("/employees/:id", (req, res) => {
    const { name, email, mobileno, Designation, gender, Course, ImgUpload } = req.body;
    const employeeId = req.params.id;
  
    EmployeeModel.findByIdAndUpdate(employeeId, { name, email, mobileno, Designation, gender, Course, ImgUpload }, { new: true })
      .then(updatedEmployee => {
        if (!updatedEmployee) {
          return res.status(404).json({ error: "Employee not found" });
        }
        res.json(updatedEmployee);
      })
      .catch(err => {
        console.error("Error updating employee:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  });


app.delete("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
  
    EmployeeModel.findByIdAndDelete(employeeId)
      .then(deletedEmployee => {
        if (!deletedEmployee) {
          return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully" });
      })
      .catch(err => {
        console.error("Error deleting employee:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  });

app.get("/employees/search", (req, res) => {
    const { keyword } = req.query;
  
    // Use regex to perform a case-insensitive search
    const searchRegex = new RegExp(keyword, 'i');
  
    EmployeeModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        // Add other fields you want to search here
      ]
    })
      .then(employees => {
        res.json(employees);
      })
      .catch(err => {
        console.error("Error searching employees:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  });

app.listen(port,(req,res)=>{
    console.log(`Server Started at PORT ${port}`);
})


app.post("/adminlogin", (req, res) => {
  const { username, password } = req.body; 
  
  AdminModel.findOne({ username }).then((admin) => {
      console.log(admin);
      if (!admin || admin.password !== password) { 
        return res.status(401).json({ error: "Invalid username or password" });
      }

      
      req.session.adminId = admin._id; 
      res.json({ message: "Login successful" });
    })
    .catch((err) => {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});
