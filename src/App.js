import React from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import AddExpenseForm from './AddExpenseForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpenseForm />} />
        </Routes>
      {/* Other components and content */}
    </div>
    </Router>
  );
}

export default App;
