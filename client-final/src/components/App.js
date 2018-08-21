import React from 'react';
import { Router } from '@reach/router';

import Header from './Header';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import ContactPage from '../pages/ContactPage';
import { CartProvider } from './Cart';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="section">
        <Router>
          <HomePage path="/" />
          <CheckoutPage path="checkout" />
          <DetailPage path="product/:productId" />
          <OrdersPage path="orders" />
          <ContactPage path="contact" />
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
