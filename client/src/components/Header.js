import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <h1 className="App-title">Formidable Store</h1>
      <nav className="App-menu">
        <ul>
          <li>Shop</li>
          <li>Cart (0)</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
