// import React from 'react';
// import './Dashboard.css'; // Import the CSS file for styling
// import { Link } from 'react-router-dom';
// const Dashboard = () => {
//   const transactions = [
   
//   ];

//   return (
//     <div className="dashboard">
      
//       <div className="summary-cards">
//         <div className="card">
//           <h3>Total Expenses</h3>
//           <p></p>
//         </div>
        
//       </div>
      
//       <div className="recent-transactions">
//         <h3>Recent Transactions</h3>
//         <Link to="/add-expense">
//           <button className="add-expense-button">Add New Expense</button>
//         </Link>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Amount</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map(transaction => (
//               <tr key={transaction.id}>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.category}</td>
//                 <td>{transaction.description}</td>
//                 <td>{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}</td>
//                 <td>
//                   <button>Edit</button>
//                   <button>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="graphical-reports">
//         <h3>Graphical Reports</h3>
//         <div className="charts">
//           <div className="pie-chart">
//             {/* Pie chart goes here */}
//             <h4>Expenses by Category</h4>
//             <img src="./images/pie.png" alt="Pie Chart" />
//           </div>
//           <div className="line-chart">
//             {/* Line chart goes here */}
//             <h4>Expenses Over Time</h4>
//             <img src="./images/line.png" alt="Line Chart" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getFromLocalStorage } from './localStorageUtils';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [totalExpenses, setTotalExpenses] = useState(0);

//   useEffect(() => {
//     // Get transactions and total expenses from localStorage
//     const storedTransactions = getFromLocalStorage('transactions') || [];
//     const storedTotalExpenses = getFromLocalStorage('totalExpenses') || 0;

//     setTransactions(storedTransactions);
//     setTotalExpenses(storedTotalExpenses);
//   }, []);

//   return (
//     <div className="dashboard">
//       {/* <div className="total-balance">
//         <h2>Total Balance: ${2000 - totalExpenses}</h2>
//       </div> */}
      
//       <div className="summary-cards">
//         <div className="card">
//           <h3>Total Expenses</h3>
//           <p>${totalExpenses}</p>
//         </div>
//         {/* <div className="card">
//           <h3>Total Income</h3>
//           <p>$2000</p>
//         </div> */}
//         {/* <div className="card">
//           <h3>Total Savings</h3>
//           <p>${2000 - totalExpenses}</p>
//         </div> */}
//       </div>
      
//       <div className="recent-transactions">
//         <h3>Recent Transactions</h3>
//         <Link to="/add-expense">
//           <button className="add-expense-button">Add New Expense</button>
//         </Link>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Amount</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map(transaction => (
//               <tr key={transaction.id}>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.category}</td>
//                 <td>{transaction.description}</td>
//                 <td>{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}</td>
//                 <td>
//                   <button>Edit</button>
//                   <button>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="graphical-reports">
//         <h3>Graphical Reports</h3>
//         <div className="charts">
//           <div className="pie-chart">
//             {/* Pie chart goes here */}
//             <h4>Expenses by Category</h4>
//             <img src="./images/pie.png" alt="Pie Chart" />
//           </div>
//           <div className="line-chart">
//             {/* Line chart goes here */}
//             <h4>Expenses Over Time</h4>
//             <img src="./images/line.png" alt="Line Chart" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;







import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFromLocalStorage,  saveToLocalStorage } from './localStorageUtils';
import './Dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Get transactions from localStorage
    const storedTransactions = getFromLocalStorage('transactions') || [];

    // Calculate total expenses
    const calculatedTotalExpenses = storedTransactions.reduce((acc, transaction) => {
      // Assuming negative amounts represent expenses
      return transaction.amount > 0 ? acc + Math.abs(transaction.amount) : acc;
    }, 0);

    setTransactions(storedTransactions);
    setTotalExpenses(calculatedTotalExpenses);
  }, []);
  const handleDelete = (id) => {
    // Filter out the transaction to be deleted
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);

    // Calculate the new total expenses
    const newTotalExpenses = updatedTransactions.reduce((acc, transaction) => {
      return transaction.amount > 0 ? acc + Math.abs(transaction.amount) : acc;
    }, 0);

    // Update state
    setTransactions(updatedTransactions);
    setTotalExpenses(newTotalExpenses);

    // Save updated transactions and total expenses to localStorage
    saveToLocalStorage('transactions', updatedTransactions);
    saveToLocalStorage('totalExpenses', newTotalExpenses);
  };


  return (
    <div className="dashboard">
      {/* <div className="total-balance">
        <h2>Total Balance: ${2000 - totalExpenses}</h2>
      </div> */}
      
      <div className="summary-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses}</p>
        </div>
        {/* <div className="card">
          <h3>Total Income</h3>
          <p>$2000</p>
        </div> */}
        {/* <div className="card">
          <h3>Total Savings</h3>
          <p>${2000 - totalExpenses}</p>
        </div> */}
      </div>
      
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <Link to="/add-expense">
          <button className="add-expense-button">Add New Expense</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`}</td>
                <td>
                  
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default Dashboard;
