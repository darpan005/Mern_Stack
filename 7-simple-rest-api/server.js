const express = require("express");

const app = express();

const PORT = 5000;

// middleware
app.use(express.json());

//Sample Data
const employees = [
  {
    id: 1,
    name: "Darpan",
    branch: "CE",
    salary: 50000,
  },
  {
    id: 2,
    name: "Parth",
    branch: "EC",
    salary: 60000,
  },
  {
    id: 3,
    name: "Rahul",
    branch: "IT",
    salary: 40000,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Employee Page");
});

// Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

//Get employee by ID
app.get("/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));

  if (!employee) {
    return res.status(404).json({
      message: "Employee not Found",
    });
  }
  res.json(employee);
});

//Post Route
app.post("/employees", (req, res) => {
  const newemployee = req.body;

  employees.push(newemployee);

  res.status(201).json({
    message: "Employee Added Successfully",
    employee: newemployee,
  });
});

//PUT Route
app.put("/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  employee.name = req.body.name;
  employee.branch = req.body.branch;
  employee.salary = req.body.salary;

  res.json({
    message: "Employee Data Updated Successfully",
    employee: employee,
  });
});

//DELETE Route
app.delete("/employees/:id", (req,res) =>{
    const index = employees.findIndex(
        (e) => e.id === parseInt(req.params.id)
    );

    if(index === -1){
        return res.status(404).json({
            message: "Employee not found",
        });
    }

    const deletedEmployee = employees.splice(index, 1);

    res.json({
        message: "Employee deleted successfully",
        employee: deletedEmployee[0],
    });
});

//Start server
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});