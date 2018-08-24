import React from 'react';
import './Cart.css';
import Product from '../components/Product';
import fakeData from '../fakedata.json';

const Cart = () => {
  return (
    <div className="Cart">
      {fakeData.map(({ id, name, src, price }) => (
        <div key={id} className="Cart-item">
          <div className="Cart-item-image-container">
            <img src={src} alt={name} className="Cart-item-image" />
          </div>
          <div className="Cart-item-info">
            <div className="Cart-item-name">{name}</div>
            <div className="Cart-item-price">{price}</div>
          </div>
          <button className="Cart-item-btn">REMOVE</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
