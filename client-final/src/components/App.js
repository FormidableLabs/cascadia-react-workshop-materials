import React from 'react';
import { Router } from '@reach/router';

import Header from './Header';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import ContactPage from '../pages/ContactPage';
import { CartProvider } from './Cart';

import { HOME, PRODUCT, CHECKOUT, ORDERS, CONTACT } from '../utils/constants';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="section">
        <Router>
          <HomePage path={HOME} />
          <CheckoutPage path={CHECKOUT} />
          <DetailPage path={`${PRODUCT}/:productId`} />
          <OrdersPage path={ORDERS} />
          <ContactPage path={CONTACT} />
        </Router>
      </div>
    </div>
  );
};

const ConnectedApp = () => {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
};

export default ConnectedApp;
