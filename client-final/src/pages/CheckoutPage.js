import React from 'react';
import CreditCardForm from '../components/CreditCardForm';
import CartList from '../components/CartList';
import { CartConsumer } from '../components/Cart';

const CheckoutPage = ({ purchaseCart }) => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h3 className="subtitle is-3">Billing Details</h3>
          <CreditCardForm onSubmit={purchaseCart} />
        </div>
        <div className="column">
          <h3 className="subtitle is-3">Cart</h3>
          <CartList />
        </div>
      </div>
    </div>
  );
};

const ConnectedCheckoutPage = () => (
  <CartConsumer>
    {({ purchaseCart }) => <CheckoutPage purchaseCart={purchaseCart} />}
  </CartConsumer>
);

export default ConnectedCheckoutPage;
