import React from 'react';
import { Connect, query } from 'urql';
import Product from './Product';
import Loading from '../components/Loading';

const Products = ({ products }) => {
  if (!products) return null;
  const productList = products.slice();
  const rows = [];
  while (productList.length > 0) {
    rows.push(productList.splice(0, 3));
  }

  return rows.map((products, index) => (
    <div className="columns" key={index}>
      {products.map((product, index) => (
        <div className="column" key={index}>
          <Product product={products[index]} />
        </div>
      ))}
    </div>
  ));
};

export const GetProducts = `
query {
  getProducts {
    id
    name
    imageUrl
    price
  }
}
`;

const ConnectedProducts = () => (
  <Connect query={query(GetProducts)}>
    {({ loaded, data }) => {
      if (!loaded) {
        return <Loading />;
      }
      return <Products products={data.getProducts} />;
    }}
  </Connect>
);

export default ConnectedProducts;
