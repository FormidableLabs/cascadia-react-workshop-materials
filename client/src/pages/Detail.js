import React from 'react';
import './Detail.css';

const product = {
  src:
    'https://www.playgoodr.com/wp-content/uploads/2018/03/Rabbit-Egg-Hunt-with-Zombie-Jesus-OG-BLM-BLG1-Side.jpg',
  name: 'RABBIT EGG HUNT WITH ZOMBIE JESUS',
  price: '$25.00'
};

const Detail = ({
  src = product.src,
  name = product.name,
  price = product.price
}) => {
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
