import React from 'react';
import './Detail.css';

const Detail = ({ src, name, price }) => {
  return (
    <div className="Detail">
      <div className="Detail-image-container">
        <img src={src} alt={name} className="Detail-image" />
      </div>
      <div className="Detail-name">{name}</div>
      <div className="Detail-price">{price}</div>
      <button className="Detail-btn">ADD TO CART</button>
    </div>
  );
};

export default Detail;
