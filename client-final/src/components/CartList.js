import React, { Fragment } from 'react';
import { priceInDollars } from '../utils';
import CartItem from './CartItem';
import { CartConsumer } from './Cart';

const CartList = ({ items = [], total, updateQuantity }) => {
  if (items.length === 0) {
    return (
      <div className="level">
        <p className="level-item has-text-centered">Your cart is empty</p>
      </div>
    );
  }

  return (
    <Fragment>
      {items.map(item => (
        <CartItem
          key={item.id}
          product={item}
          onQuantityChange={updateQuantity}
        />
      ))}
      <div className="subtitle is-2">Total: {priceInDollars(total)}</div>
    </Fragment>
  );
};

const ConnectedCartList = () => (
  <CartConsumer>
    {({ cart, updateQuantity }) => (
      <CartList
        items={cart.products}
        total={cart.totalPrice}
        updateQuantity={updateQuantity}
      />
    )}
  </CartConsumer>
);

export default ConnectedCartList;
