import { useState } from "react";
import "./App.css";

function App() {
  const [expences, setExpences] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");

  function addExpence(e) {
    e.preventDefault();

    if (title == "" || amount == "") {
      return;
    }

    const newExpence = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      category: category,
    };

    setExpences([...expences, newExpence]);
    setTitle("");
    setAmount("");
    setCategory("Food");
  }

  function deleteExpence(id) {
    const updatedExpences = expences.filter((expence) => {
      return expence.id !== id;
    });
    setExpences(updatedExpences);
  }

  const filterExpence = expences.filter((expence) => {
    if (filter === "All") {
      return true;
    }
    return expence.category === filter;
  });

  const totalExpences = filterExpence.reduce((total, expence) => {
    return total + expence.amount;
  }, 0);

  return (
    <div>
      <div>
        <h1>Expence Tracker</h1>
        <h3>Total Expences</h3>
        <h2>${totalExpences}</h2>
      </div>

      <form onSubmit={addExpence}>
        <input
          type="text"
          placeholder="Expence Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Travel">Travel</option>
          <option value="Shoping">Shoping</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Add Expences</button>
      </form>

      <div>
        <h3>Expences</h3>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        {filterExpence.length === 0 ? (
          <p>No Expences</p>
        ) : (
          filterExpence.map((expence) => (
            <div key={expence.id}>
              <div>
                <h3>{expence.title}</h3>
                <p>{expence.category}</p>
              </div>

              <div>
                <span>${expence.amount}</span>

                <button onClick={() => deleteExpence(expence.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
