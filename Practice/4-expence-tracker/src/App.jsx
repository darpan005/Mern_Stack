import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [expences, setExpences] = useState(()=>{
    const savedExpences=localStorage.getItem("expences");
    return savedExpences ? JSON.parse(savedExpences) : [];
  });

  useEffect (() => {
    localStorage.setItem("expences", JSON.stringify(expences));
  },[expences]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [filter, setFilter] = useState("All");

  function addExpense(e) {
    e.preventDefault();

    if (title === "" || amount === "") {
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      category: category,
    };

    setExpenses([...expences, newExpense]);

    setTitle("");
    setAmount("");
    setCategory("Food");
  }

  function deleteExpense(id) {
    const updatedExpenses = expenses.filter((expense) => {
      return expense.id !== id;
    });

    setExpenses(updatedExpenses);
  }

  const filteredExpenses = expences.filter((expense) => {
    if (filter === "All") {
      return true;
    }

    return expense.category === filter;
  });

  const totalExpense = filteredExpenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  return (
    <div className="app">
      <div className="expense-container">

        <h1>Expense Tracker</h1>

        <div className="total-box">
          <p>Total Expenses</p>
          <h2>₹{totalExpense.toFixed(2)}</h2>
        </div>

        <form onSubmit={addExpense} className="expense-form">

          <input
            type="text"
            placeholder="Expense name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">Add Expense</button>

        </form>

        <div className="filter-section">

          <h3>Expenses</h3>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

        </div>

        <div className="expense-list">

          {filteredExpenses.length === 0 ? (
            <p className="empty-message">No expenses found.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <div className="expense-item" key={expense.id}>

                <div>
                  <h3>{expense.title}</h3>
                  <p>{expense.category}</p>
                </div>

                <div className="expense-right">
                  <span>₹{expense.amount.toFixed(2)}</span>

                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default App;