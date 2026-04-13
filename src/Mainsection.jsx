import './App.css';
import './mainsection.css';
// function MainSection() {

//   return(
//     // cards for the main section
//   <div className="container">

//     <div className="cards">

//       <div className='card'>
//         <h2>Monthly Budget</h2>
//         <p>3000/-</p>
//         <p>0% used</p>
//       </div>

//       <div className='card'>
//         <h2>Total income</h2>
//         <p>-</p>
//         <p>-- transactions</p>
//       </div>

//       <div className='card'>
//         <h2>Total expenses</h2>
//         <p>-</p>
//         <p>-- transactions</p>
//       </div>

//       <div className='card'>
//         <h2>Remaining</h2>
//         <p>-</p>
//         <p>under budget</p>
//       </div>

//     </div>
    
//   </div>
  
//   );
// }
// export default MainSection;
import React, { useState } from "react";
import "./mainsection.css";

const CATEGORIES = {
  income:  ["Salary", "Freelance", "Investment", "Rental", "Other"],
  expense: ["Housing", "Food", "Transport", "Entertainment", "Health", "Shopping", "Utilities", "Other"],
};

function MainSection({ onAddTransaction, totalIncome, totalExpenses, remaining, monthlyBudget }) {
  const [form, setForm] = useState({
    type: "expense",
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const pctUsed = monthlyBudget > 0
    ? ((totalExpenses / monthlyBudget) * 100).toFixed(0)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.category) return;
    const newTxn = {
      id: Date.now(),
      type: form.type,
      name: form.name,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    };
    onAddTransaction(newTxn);
    setForm((f) => ({ ...f, name: "", amount: "", category: "" }));
  };

  return (
    <div className="container">

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Monthly Budget</span>
          <span className="kpi-value">{monthlyBudget}/-</span>
          <span className="kpi-sub">{pctUsed}% used</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Total Income</span>
          <span className="kpi-value green">
            {totalIncome > 0 ? `$${totalIncome.toLocaleString()}` : "-"}
          </span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Total Expenses</span>
          <span className="kpi-value red">
            {totalExpenses > 0 ? `$${totalExpenses.toLocaleString()}` : "-"}
          </span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Remaining</span>
          <span className={`kpi-value ${remaining >= 0 ? "green" : "red"}`}>
            {totalExpenses > 0 ? `$${remaining.toLocaleString()}` : "-"}
          </span>
          <span className="kpi-sub">under budget</span>
        </div>
      </div>

      <form className="txn-form" onSubmit={handleSubmit}>
        <div className="form-toggle">
          <button
            type="button"
            className={form.type === "income" ? "active-income" : ""}
            onClick={() => setForm((f) => ({ ...f, type: "income", category: "" }))}
          >
            ↗ Income
          </button>
          <button
            type="button"
            className={form.type === "expense" ? "active-expense" : ""}
            onClick={() => setForm((f) => ({ ...f, type: "expense", category: "" }))}
          >
            ↘ Expense
          </button>
        </div>

        <input
          placeholder="Description"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        />
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">Select category</option>
          {CATEGORIES[form.type].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button type="submit" className={`submit-btn ${form.type}`}>
          + Add {form.type === "income" ? "Income" : "Expense"}
        </button>
      </form>

    </div>
  );
}

export default MainSection;