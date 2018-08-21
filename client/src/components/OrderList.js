import React from 'react';
import { Connect, query } from 'urql';
import { priceInDollars } from '../utils';
import Loading from './Loading';

const OrderList = ({ orders }) => {
  if (orders.length === 0) {
    return <div>No orders...</div>;
  }

  return orders.map(({ id, products }) => {
    return (
      <div key={id} className="box">
        <h3 className="title is-3">Order #{id}</h3>
        {products.map(({ id, name, imageUrl, price, quantity }) => (
          <div key={id} className="box">
            <article className="columns">
              <div className="column">
                <figure className="image is-4by3">
                  <img src={imageUrl} alt={name} />
                </figure>
              </div>
              <div className="column">
                <h4 className="title is-4">{name}</h4>
                <p>
                  {priceInDollars(price)} x {quantity}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  });
};

export const GetOrders = `
query($customerName: String!) {
  getOrders(name: $customerName) {
    id
    totalQuantity
    purchased
    purchasedAt
    totalPrice
    products {
      id
      name
      imageUrl
      price
      quantity
    }
  }
}
`;

const ConnectedOrders = ({ customerName }) => {
  return (
    <Connect query={query(GetOrders, { customerName })}>
      {({ loaded, data }) => {
        if (!loaded) {
          return <Loading />;
        }
        const orders = data.getOrders ? data.getOrders : [];
        return <OrderList orders={orders} />;
      }}
    </Connect>
  );
};

export default ConnectedOrders;
