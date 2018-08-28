import React, { Component } from 'react';
import { Connect, mutation } from 'urql';

import Header from './Header';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Checkout from '../pages/Checkout';

import { HOME, CHECKOUT, DETAIL, FORMIDABLE_CART_ID } from '../utils/constants';

import './App.css';

class App extends Component {
  state = {
    route: HOME
  };

  updateRoute = route => {
    this.setState({ route });
  };

  updateCart = async ({ productId, quantity }) => {
    const params = { productId, quantity };

    const cartId = localStorage.getItem(FORMIDABLE_CART_ID);
    if (cartId) {
      params.cartId = cartId;
    }
    const { setProductQuantityInCart: cart } = await this.props.updateCart(
      params
    );

    localStorage.setItem(FORMIDABLE_CART_ID, cart.id);
  };

  render() {
    const { route } = this.state;

    return (
      <div className="App">
        <Header updateRoute={this.updateRoute} />
        {route === HOME && <Home updateCart={this.updateCart} />}
        {route === CHECKOUT && <Checkout updateCart={this.updateCart} />}
        {route === DETAIL && <Detail updateCart={this.updateCart} />}
      </div>
    );
  }
}

const UpdateCart = `
mutation($cartId: ID, $productId: ID!, $quantity: Int!) {
  setProductQuantityInCart(shoppingCartId: $cartId, productId: $productId, quantity: $quantity) {
    id
    purchased
    total
    products {
      id
      name
      imageUrl
      price
    }
  }
}
`;

const ConnectedApp = () => (
  <Connect mutation={{ updateCart: mutation(UpdateCart) }}>
    {({ updateCart }) => <App updateCart={updateCart} />}
  </Connect>
);

export default ConnectedApp;
