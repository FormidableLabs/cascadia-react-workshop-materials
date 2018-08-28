import React from 'react';
import Form from '../components/Form';
import Cart from '../components/Cart';

import './Checkout.css';

const Checkout = ({ updateCart }) => {
  return (
    <div className="Checkout">
      <div className="Checkout-billing">
        <h3 className="Checkout-billing-title">Billing Details</h3>
        <Form />
      </div>
      <div className="Checkout-cart">
        <h3 className="Checkout-cart-title">Cart</h3>
        <Cart updateCart={updateCart} />
      </div>
    </div>
  );
};

export default Checkout;
