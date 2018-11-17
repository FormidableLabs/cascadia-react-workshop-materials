import React, { Component } from 'react';

import Header from './Header';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import ContactPage from '../pages/ContactPage';

import { CartProvider } from './Cart';

import { HOME, CHECKOUT, DETAIL, ORDERS, CONTACT } from '../utils/constants';

class App extends Component {
  state = {
    route: HOME,
    params: {},
  };

  updateRoute = ({ route, params = {} }) => {
    this.setState({ route, params });
  };

  render() {
    const { route } = this.state;

    return (
      <div className="App">
        <Header updateRoute={this.updateRoute} />
        <div className="section">
          {route === HOME && <HomePage updateRoute={this.updateRoute} />}
          {route === CHECKOUT && <CheckoutPage />}
          {route === DETAIL && (
            <DetailPage productId={this.state.params.productId} />
          )}
          {route === ORDERS && <OrdersPage />}
          {route === CONTACT && <ContactPage updateRoute={this.updateRoute} />}
        </div>
      </div>
    );
  }
}

const ConnectedApp = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default ConnectedApp;
