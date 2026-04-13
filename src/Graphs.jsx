// import './App.css';
// import './graphs.css';
// // import BudgetOverviewChart from "./BudgetOverviewChart";
// // import Last7DaysChart from "./Last7DaysChart";
// // import CategoryBreakdownChart from "./CategoryBreakdownChart";

// function Graphs() {
//   return ( 
//     <div className="container">
//       <div className="graphs">
//         <div className='graph'>

//             <h2>Graph 1</h2>
            
//         </div>
//         <div className='graph'>
//             <h2>Graph 2</h2>
//         </div>
        
//       </div>
      
      
//     </div>
//    );
// }
// export default Graphs;
import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./graphs.css";
 
// ── Register ONCE at module level (never inside a component) ──────────────
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
 
// ── Colour palette ────────────────────────────────────────────────────────
const DOUGHNUT_COLORS = [
  "#0D9488", "#F59E0B", "#6366F1", "#EF4444",
  "#10B981", "#EC4899", "#3B82F6", "#F97316",
];
 
function Graphs({ transactions = [], monthlyBudget = 3000 }) {
 
  // ── Graph 1: Budget vs Income vs Spent (Bar) ────────────────────────────
  // useMemo means this only recalculates when `transactions` or `monthlyBudget` changes
  const barData = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
 
    const spent = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
 
    return {
      labels: ["Budget", "Income", "Spent"],
      datasets: [
        {
          label: "Amount ($)",
          data: [monthlyBudget, income, spent],
          backgroundColor: ["#0D9488", "#10B981", "#EF4444"],
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [transactions, monthlyBudget]);
 
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // lets us control height via the wrapper div
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          // Custom tooltip label: shows "$1,200" instead of "1200"
          label: (ctx) => ` $${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => `$${v}` },
        grid: { color: "#e5e7eb" },
      },
      x: { grid: { display: false } },
    },
  };
 
  // ── Graph 2: Category breakdown (Doughnut) ──────────────────────────────
  const doughnutData = useMemo(() => {
    // Step 1: filter to expenses only
    const expenses = transactions.filter((t) => t.type === "expense");
 
    // Step 2: group by category → { Food: 200, Transport: 80, ... }
    const categoryMap = {};
    expenses.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
 
    // Step 3: split into parallel arrays for Chart.js
    const labels = Object.keys(categoryMap);
    const amounts = Object.values(categoryMap);
 
    return {
      labels,
      datasets: [
        {
          data: amounts,
          backgroundColor: DOUGHNUT_COLORS.slice(0, labels.length),
          borderWidth: 2,
          borderColor: "#fff",
          hoverOffset: 10,
        },
      ],
    };
  }, [transactions]);
 
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right", labels: { boxWidth: 12, padding: 14, font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.toLocaleString()} — ${ctx.label}`,
        },
      },
    },
  };
 
  // ── Check if we have expense data yet (guard empty state) ───────────────
  const hasExpenses = transactions.some((t) => t.type === "expense");
 
  return (
    <div className="container">
      <div className="graphs">
 
        {/* Graph 1 — Bar chart */}
        <div className="graph">
          <h2>Budget Overview</h2>
          <p className="graph-sub">Budget · Income · Spent</p>
          {/* Wrapper div with explicit height — Chart.js NEEDS this */}
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
 
        {/* Graph 2 — Doughnut chart */}
        <div className="graph">
          <h2>Category Breakdown</h2>
          <p className="graph-sub">Expenses by category</p>
          <div className="chart-wrapper">
            {hasExpenses ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <div className="empty-state">
                <span>No expense data yet</span>
                <small>Add an expense to see the breakdown</small>
              </div>
            )}
          </div>
        </div>
 
      </div>
    </div>
  );
}
 
export default Graphs;