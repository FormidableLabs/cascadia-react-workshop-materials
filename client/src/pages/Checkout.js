import React from 'react';
import './Checkout.css';
import Form from '../components/Form';
import Cart from '../components/Cart';
import Product from '../components/Product';
import fakeData from '../fakedata.json';

const Checkout = () => {
  return (
    <div className="Checkout">
      <div className="Checkout-billing">
        <h3>Billing Details</h3>
        <Form />
      </div>
      <div className="Checkout-cart">
        <h3>Cart</h3>
        <Cart />
      </div>
    </div>
  );
};

export default Checkout;
