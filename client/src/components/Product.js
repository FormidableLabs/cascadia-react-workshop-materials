import React from 'react';
import './Product.css';

const Product = ({ src, name, price }) => {
  return (
    <div className="Product">
      <div className="Product-image-container">
        <img src={src} alt={name} className="Product-image" />
      </div>
      <div className="Product-name">{name}</div>
      <div className="Product-price">{price}</div>
      <button className="Product-btn">ADD TO CART</button>
    </div>
  );
};

export default Product;
