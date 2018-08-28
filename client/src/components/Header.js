import React from 'react';
import { Connect, query } from 'urql';
import { GetCart } from './Cart';
import { HOME, CHECKOUT } from '../utils/constants';
import { FORMIDABLE_CART_ID } from '../utils/constants';

import './Header.css';

const Header = ({ updateRoute, cartCount }) => {
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
            <li>
              Cart
              {cartCount > 0 ? `(${cartCount})` : null}
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
};

const ConnectedHeader = ({ updateRoute }) => {
  const cartId = localStorage.getItem(FORMIDABLE_CART_ID);

  if (!cartId) {
    return <Header updateRoute={updateRoute} cartCount={0} />;
  }

  return (
    <Connect query={query(GetCart, { id: cartId })}>
      {({ loaded, data }) => {
        let cartCount = loaded ? data.getShoppingCart.products.length : 0;
        return <Header updateRoute={updateRoute} cartCount={cartCount} />;
      }}
    </Connect>
  );
};

export default ConnectedHeader;
