import React from 'react';
import './Home.css';
import Product from '../components/Product';
import fakeData from '../fakedata.json';

const Home = () => {
  return (
    <div className="Home">
      {fakeData.map(({ id, ...rest }) => (
        <Product key={id} {...rest} />
      ))}
    </div>
  );
};

export default Home;
