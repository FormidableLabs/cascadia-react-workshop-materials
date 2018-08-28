import React from 'react';
import { Connect, query } from 'urql';
import { priceInDollars } from '../utils';
import { FORMIDABLE_CART_ID } from '../utils/constants';

import './Cart.css';

const Cart = ({ products, total, updateCart }) => (
  <div className="Cart">
    {products.map(({ id: productId, name, imageUrl, price }) => (
      <div key={productId} className="Cart-item">
        <div className="Cart-item-image-container">
          <img src={imageUrl} alt={name} className="Cart-item-image" />
        </div>
        <div className="Cart-item-info">
          <div className="Cart-item-name">{name}</div>
          <div className="Cart-item-price">{priceInDollars(price)}</div>
        </div>
        <button
          className="Cart-item-btn"
          onClick={() => updateCart({ productId, quantity: 0 })}
        >
          REMOVE
        </button>
      </div>
    ))}
    <div className="Cart-total">Total: {priceInDollars(total)}</div>
  </div>
);

export const GetCart = `
query($id: ID!) {
  getShoppingCart(id: $id) {
    id
    products {
      id
      name
      price
      imageUrl
      quantity
    }
    total
  }
}
`;

const ConnectedCart = ({ updateCart }) => {
  const cartId = localStorage.getItem(FORMIDABLE_CART_ID);
  if (!cartId) {
    return <div>Your cart is empty</div>;
  }

  return (
    <Connect query={query(GetCart, { id: cartId })}>
      {({ loaded, data }) => {
        if (!loaded) {
          return <div>Loading...</div>;
        }

        const { products, total } = data.getShoppingCart;
        if (products.length === 0) {
          return <div>Your cart is empty</div>;
        }

        return (
          <Cart products={products} total={total} updateCart={updateCart} />
        );
      }}
    </Connect>
  );
};

export default ConnectedCart;
