import React from 'react';
import { Connect, query } from 'urql';

import Product from '../components/Product';

import './Home.css';

const GetProducts = `
query {
  getProducts {
    id
    name
    imageUrl
    price
  }
}
`;

const Home = ({ updateCart }) => {
  return (
    <Connect query={query(GetProducts)}>
      {({ loaded, data }) => {
        if (!loaded) {
          return <div>Loading...</div>;
        }
        return (
          <div className="Home">
            {data.getProducts.map(product => (
              <Product
                key={product.id}
                product={product}
                updateCart={updateCart}
              />
            ))}
          </div>
        );
      }}
    </Connect>
  );
};

export default Home;
