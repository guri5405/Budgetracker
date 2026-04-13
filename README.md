# 💰 Budget Tracker Application

A modern, responsive, and user-friendly **Budget Tracker Web App** built with React.js to help users manage their finances efficiently by tracking income, expenses, and overall budget in real-time.

---

## ✨ Features

* 📊 **Dashboard Overview**

  * Monthly Budget
  * Total Income
  * Total Expenses
  * Remaining Balance

* ➕ **Add Transactions**

  * Add income or expense
  * Select category and date
  * Real-time updates

* 📋 **Transaction History**

  * Dynamically rendered transaction list
  * Color-coded (Income 🟢 / Expense 🔴)
  * Delete transactions

* 📈 **Charts & Analytics**

  * Bar Chart (Budget vs Income vs Expenses)
  * Doughnut Chart (Category-wise expense breakdown)

* 📱 **Responsive Design**

  * Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **State Management:** React Hooks (`useState`, `useMemo`)
* **Charts:** Chart.js + react-chartjs-2
* **Styling:** CSS (Flexbox, Grid, Media Queries)

---

## 📂 Project Structure

```bash
src/
│
│── Header.jsx
│── MainSection.jsx
│── Transactions.jsx
│── Graphs.jsx
│── graphs.css
│── main.css
│
│── App.jsx
│── index.js
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone [[https://github.com/guri5405/Budgetracker]]

# Navigate to project folder
cd budget-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧠 How It Works

* User adds transactions via the form
* Data is stored in React state
* KPIs update automatically:

  * Total Income
  * Total Expenses
  * Remaining Budget
* Charts update dynamically using the latest data
* UI re-renders instantly for smooth experience

---

## 🎯 Key Highlights

* Clean and modern UI
* Dynamic data rendering
* Real-time updates
* Component-based architecture
* Optimized performance using `useMemo`

---

## 🔮 Future Enhancements

* ✏️ Edit transactions
* 💾 Save data using LocalStorage or Backend
* 🔐 User authentication
* 🌙 Dark mode
* 📊 Advanced analytics

---

## 🤝 Contributing
Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📄 License
This project is open-source and available under the MIT License.

---

## 🙌 Author
Developed with ❤️ using React.js
