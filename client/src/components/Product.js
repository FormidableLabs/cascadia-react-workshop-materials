import React from 'react';
import { priceInDollars } from '../utils';

import './Product.css';

const Product = ({
  product: { id: productId, imageUrl, name, price },
  updateCart
}) => (
  <div className="Product">
    <div className="Product-image-container">
      <img src={imageUrl} alt={name} className="Product-image" />
    </div>
    <div className="Product-name">{name}</div>
    <div className="Product-price">{priceInDollars(price)}</div>
    <button
      className="Product-btn"
      onClick={() => updateCart({ productId, quantity: 1 })}
    >
      ADD TO CART
    </button>
  </div>
);

export default Product;
