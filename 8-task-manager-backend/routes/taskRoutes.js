const express = require("express");

const router = express.Router();

const {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

// GET all tasks
router.get("/", getTasks);

// POST create task
router.post("/", createTask);

// GET single task
router.get("/:id", getTaskById);

// UPDATE task
router.put("/:id", updateTask);

// DELETE task
router.delete("/:id", deleteTask);

module.exports = router;