import React from 'react';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ExpenseTracker</div>
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          
         
        </ul>
      </nav>
      
    </header>
  );
}

export default Header;
