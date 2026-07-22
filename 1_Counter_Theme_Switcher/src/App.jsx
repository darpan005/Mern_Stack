import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <h1>Counter + Theme Switcher</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2
        className={
          count < 0 ? "negative" : count > 0 ? "positive" : ""
        }
      >
        {count}
      </h2>

      <div>
        <button
          disabled={count <= -100}
          onClick={() => setCount(count - 10)}
        >
          -10
        </button>

        <button onClick={() => setCount(count - 5)}>
          Decrease
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>

        <button onClick={() => setCount(count + 5)}>
          Increase
        </button>

        <button
          disabled={count >= 100}
          onClick={() => setCount(count + 10)}
        >
          +10
        </button>
      </div>

      <div>
        <button
          onClick={() =>
            setCount(Math.floor(Math.random() * 201) - 100)
          }
        >
          Random
        </button>
      </div>
    </div>
  );
}

export default App;