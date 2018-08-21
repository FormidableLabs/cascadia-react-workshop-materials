import React from 'react';
import { priceInDollars } from '../utils';
import Counter from './Counter';

const CartItem = ({ product, onQuantityChange }) => {
  const { id: productId, name, imageUrl, price, quantity } = product;
  return (
    <div className="box">
      <div className="media">
        <div className="media-content">
          <div className="columns">
            <div className="column">
              <figure className="image is-4by3">
                <img src={imageUrl} alt={name} />
              </figure>
            </div>
            <div className="column">
              <div className="title is-5">{name}</div>
              <div className="subtitle is-7">{priceInDollars(price)}</div>
            </div>
            <div className="column">
              <Counter
                defaultValue={quantity}
                onChange={quantity => {
                  onQuantityChange({ productId, quantity });
                }}
              />
            </div>
          </div>
        </div>
        <div className="media-right">
          <button
            className="delete"
            onClick={() => onQuantityChange({ productId, quantity: 0 })}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
