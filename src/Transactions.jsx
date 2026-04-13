import './App.css';
import './transaction.css';
// function Transactions({ transactions, deleteTransaction }) {

//   return(
  
//     <div className="container">
//       <div className="transactions">
//         <h2>Transactions</h2>
//       </div>
      
//     </div>
    
      
//   )
// }

// export default Transactions;
function Transactions({ transactions, deleteTransaction }) {
  return (
    <div className='container'>
    <div className="transactions-container">
      <h2>Transactions</h2>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.map((txn) => (
            <div key={txn.id} className="transaction-item">
              
              {/* Left side (icon + details) */}
              <div className="txn-left">
                <div className={`txn-icon ${txn.type}`}>
                  {txn.type === "income" ? "↗" : "↘"}
                </div>

                <div className="txn-details">
                  <p className="txn-name">{txn.name}</p>
                  <p className="txn-meta">
                    {txn.category} • {txn.date}
                  </p>
                </div>
              </div>
              
              {/* Right side (amount) */}
              <div className={`txn-amount ${txn.type}`}>
                {txn.type === "expense" ? "-" : "+"}$
                {txn.amount}

                {/* 🗑 DELETE BUTTON */}
               <button className="delete-btn"
                  onClick={() => deleteTransaction(txn.id)}>
                 🗑</button>
              </div>


            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Transactions;