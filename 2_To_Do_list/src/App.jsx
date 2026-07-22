import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
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

  const deleteTask = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    const selectedTask = tasks.find((item) => item.id === id);

    const newTask = prompt(
      "Edit your task:",
      selectedTask.text
    );

    if (newTask !== null && newTask.trim() !== "") {
      const updatedTasks = tasks.map((item) =>
        item.id === id
          ? { ...item, text: newTask }
          : item
      );

      setTasks(updatedTasks);
    }
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") {
      return item.completed;
    }

    if (filter === "active") {
      return !item.completed;
    }

    return true;
  });

  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      <div className="input-section">
        <input
        className="task-input"
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((item) => (
          <li
            key={item.id}
            className={item.completed ? "completed-task" : ""}
          >
            <span>{item.text}</span>

            <div className="task-buttons">
              <button
                className="complete-btn"
                onClick={() => completeTask(item.id)}
              >
                {item.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="edit-btn"
                onClick={() => editTask(item.id)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;