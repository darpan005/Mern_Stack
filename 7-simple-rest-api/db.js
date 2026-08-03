const express = require("express");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// Sample Data
const students = [
  {
    id: 1,
    name: "Darpan",
    branch: "Computer",
  },
  {
    id: 2,
    name: "Rahul",
    branch: "IT",
  },
  {
    id: 3,
    name: "Priya",
    branch: "EC",
  },
];




// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Simple REST API!");
});



// GET All Students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET Student By ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});



//Post Route
app.post("/students",(req,res)=>{
  const newstudent = req.body;

  students.push(newstudent);

  res.status(201).json({
    message : "Student Adeed Succesfully",
    student : newstudent,
  });
});


//PUT Route
app.put("/students/:id",(req,res)=>{
  const student = students.find((s)=> s.id === parseInt(req.params.id));

  if(!student){
    return res.status(404).json({
      message : "Student not Found",
    });
  }
  student.name = req.body.name;
  student.branch = req.body.branch;

  res.json({
    message : "student updated successfully",
    student : student,
  });
});


//Delete Route
app.delete("/students/:id",(req,res)=>{
  const index = students.findIndex((s)=> s.id === parseInt(req.params.id));

  if(index === -1){
    return res.status(404).json({
      message : "student not Found",
    });
  }

  const deletedstudent = students.splice(index,1);

  res.json({
    message : "student deleted successfully",
    studnet : deletedstudent[0],
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
