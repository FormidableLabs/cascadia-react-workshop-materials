import React from 'react';
import './Header.css';
import { HOME, CHECKOUT } from '../utils/constants';

const Header = ({ updateRoute }) => {
  return (
    <header className="App-header">
      <h1 className="App-title" onClick={() => updateRoute(HOME)}>
        Formidable Store
      </h1>
      <nav className="App-menu">
        <ul>
          <a onClick={() => updateRoute(HOME)}>
            <li>Shop</li>
          </a>
          <a onClick={() => updateRoute(CHECKOUT)}>
            <li>Cart (0)</li>
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
