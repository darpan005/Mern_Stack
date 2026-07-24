import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
});

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() == "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  const editTask = (id) => {
    const selectedTask = tasks.find((task) => task.id === id);

    const newTask = prompt("Edit your Task:", selectedTask.text);

    if (newTask !== null && newTask.trim !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, text: newTask } : task,
      );
      setTasks(updatedTasks);
    }
  };

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "active") {
      return !task.completed;
    }

    return true;
  });

  return (
    <div className="todo-container">
      <h1 className="title">To Do List</h1>

      <input
        type="text"
        placeholder="Add a Task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button className="add-btn" onClick={addTask}>Add Task</button>

      <div className="filter">
        <button onClick={() => setFilter("all")}>All</button>

        <button onClick={() => setFilter("active")}>Active</button>

        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul className="task-list">
        {filteredTask.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}

            <button className="complete-btn" onClick={() => completeTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>

            <button className="edit-btn" onClick={() => editTask(task.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
