import React from 'react';
import Products from '../components/Products';

const HomePage = ({ updateRoute }) => {
  return (
    <div className="container">
      <Products updateRoute={updateRoute} />
    </div>
  );
};

export default HomePage;
