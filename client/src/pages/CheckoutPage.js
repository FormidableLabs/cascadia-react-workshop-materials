import React from 'react';
import CreditCardForm from '../components/CreditCardForm';
import CartList from '../components/CartList';

const CheckoutPage = ({ cart, updateQuantity, purchaseCart }) => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h3 className="subtitle is-3">Billing Details</h3>
          <CreditCardForm onSubmit={purchaseCart} />
        </div>
        <div className="column">
          <h3 className="subtitle is-3">Cart</h3>
          <CartList
            items={cart.products}
            total={cart.totalPrice}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
