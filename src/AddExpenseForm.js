// import React, { useState } from 'react';
// import './AddExpenseForm.css';

// const AddExpenseForm = () => {
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   //const [paymentMethod, setPaymentMethod] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     //console.log({ date, category, amount, description });
//     // Reset the form fields
//     setDate('');
//     setCategory('');
//     setAmount('');
//     setDescription('');
//     //setPaymentMethod('');
//   };

//   const handleCancel = () => {
//     // Reset the form fields
//     setDate('');
//     setCategory('');
//     setAmount('');
//     setDescription('');
//    // setPaymentMethod('');
//   };

//   return (
//     <form className="add-expense-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="date">Date</label>
//         <input
//           type="date"
//           id="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="category">Category</label>
//         <select
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         >
//           <option value="">Select Category</option>
//           <option value="Food">Food</option>
//           <option value="Transport">Transport</option>
//           <option value="Utilities">Utilities</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Health">Health</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="amount">Amount</label>
//         <input
//           type="number"
//           id="amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows="3"
//         ></textarea>
//       </div>
      
//       <div className="form-actions">
//         <button type="submit" className="save-button">Save</button>
//         <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
//       </div>
//     </form>
//   );
// };

// export default AddExpenseForm;













import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage, getFromLocalStorage } from './localStorageUtils';
import './AddExpenseForm.css';

const AddExpenseForm = () => {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new transaction object
    const newTransaction = {
      id: Date.now(),
      date,
      category,
      amount: parseFloat(amount),
      description,
    };

    // Get existing transactions from localStorage
    const existingTransactions = getFromLocalStorage('transactions') || [];

    // Add the new transaction to the list
    const updatedTransactions = [newTransaction, ...existingTransactions];

    // Save the updated transactions list to localStorage
    saveToLocalStorage('transactions', updatedTransactions);

    // Update total expenses
    const totalExpenses = existingTransactions.reduce((acc, transaction) => acc + (transaction.amount < 0 ? Math.abs(transaction.amount) : 0), 0) + parseFloat(amount);
    saveToLocalStorage('totalExpenses', totalExpenses);

    // Navigate back to the dashboard
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">Save</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AddExpenseForm;







