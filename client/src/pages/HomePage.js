import React from 'react';
import Products from '../components/Products';

const HomePage = ({ updateQuantity, updateRoute }) => {
  return (
    <div className="container">
      <Products updateRoute={updateRoute} updateQuantity={updateQuantity} />
    </div>
  );
};

export default HomePage;
