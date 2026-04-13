import Header from "./Header";
import './App.css';
import MainSection from "./mainsection";
import React, { useState } from "react";
import Graphs from "./Graphs";
import Transactions from "./Transactions";

function App() {
  // ── State lives HERE so both MainSection and Graphs can access it ──
  const [transactions, setTransactions] = useState([]);
  const [monthlyBudget] = useState(3000);

  // ── Called from MainSection when user submits the form ──
  const addTransaction = (newTxn) => {
    // Always spread into a NEW array — never .push() directly
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // ── Derived values for the KPI cards ──
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = monthlyBudget - totalExpenses;

  const deleteTransaction = (id) => {
  setTransactions((prev) => prev.filter((txn) => txn.id !== id));
};

  return (
    <>
      <Header />

      {/* Pass KPI values + form handler down to MainSection */}
      <MainSection
        onAddTransaction={addTransaction}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        remaining={remaining}
        monthlyBudget={monthlyBudget}
      />

      {/* Pass transactions + budget down to Graphs */}
      <Graphs
        transactions={transactions}
        monthlyBudget={monthlyBudget}
      />

      <Transactions transactions={transactions} deleteTransaction={deleteTransaction} />

    </>
  );
}

export default App;
