const express = require("express");

const app = express();

const PORT = 5000;

const students =[
    {
        id:1,
        name:"darpan",
        branch:"CE",
    },
    {
        id:2,
        name:"rahul",
        branch:"IT",
    },
    {
        id:3,
        name:"priya",
        branch:"EC",
    },
]

app.get("/",(req,res)=>{
    res.send("Welcome to  Rest API topic");
});

app.get("/students",(req,res)=>{
    res.json(students);
});

app.listen(PORT,()=>{
    console.log(`server is staarted on http://localhost:${PORT}`);
});

