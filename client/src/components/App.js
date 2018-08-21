import React, { Component } from 'react';
import { Connect, query, mutation } from 'urql';
import Header from './Header';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import ContactPage from '../pages/ContactPage';
import Loading from './Loading';

import {
  HOME,
  CHECKOUT,
  DETAIL,
  ORDERS,
  CONTACT,
  FORMIDABLE_CART_ID,
} from '../utils/constants';

class App extends Component {
  state = {
    route: HOME,
    params: {},
    cart: this.props.cart,
  };

  updateRoute = ({ route, params = {} }) => {
    this.setState({ route, params });
  };

  updateQuantity = async ({ productId, quantity }) => {
    const params = { productId, quantity };
    const cartId = this.state.cart.id;

    if (cartId) {
      params.cartId = cartId;
    }

    const { setProductQuantityInCart: cart } = await this.props.updateQuantity(
      params
    );

    if (cart.id !== localStorage.getItem(FORMIDABLE_CART_ID)) {
      localStorage.setItem(FORMIDABLE_CART_ID, cart.id);
    }

    if (cart.totalQuantity !== this.state.cart.totalQuantity) {
      this.setState({ cart });
    }
  };

  purchaseCart = async ({ name }) => {
    const { id: cartId, totalQuantity } = this.state.cart;

    if (name && cartId && totalQuantity > 0) {
      await this.props.purchaseCart({ cartId, name });
      localStorage.removeItem(FORMIDABLE_CART_ID);
      this.setState({ cart: {}, route: HOME });
    }
  };

  render() {
    const { route, cart } = this.state;

    return (
      <div className="App">
        <Header updateRoute={this.updateRoute} cartCount={cart.totalQuantity} />
        <div className="section">
          {route === HOME && (
            <HomePage
              updateRoute={this.updateRoute}
              updateQuantity={this.updateQuantity}
            />
          )}
          {route === CHECKOUT && (
            <CheckoutPage
              cart={cart}
              updateQuantity={this.updateQuantity}
              purchaseCart={this.purchaseCart}
            />
          )}
          {route === DETAIL && (
            <DetailPage
              productId={this.state.params.productId}
              updateQuantity={this.updateQuantity}
            />
          )}
          {route === ORDERS && <OrdersPage />}
          {route === CONTACT && <ContactPage updateRoute={this.updateRoute} />}
        </div>
      </div>
    );
  }
}

const GetCart = `
query($id: ID) {
  getShoppingCart(id: $id) {
    id
    purchased
    purchasedAt
    totalPrice
    totalQuantity
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

export const UpdateQuantity = `
mutation($cartId: ID, $productId: ID!, $quantity: Int!) {
  setProductQuantityInCart(id: $cartId, productId: $productId, quantity: $quantity) {
    id
    purchased
    purchasedAt
    totalPrice
    totalQuantity
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

export const PurchaseCart = `
mutation($cartId: ID, $name: String!) {
  purchaseShoppingCart(id: $cartId, name: $name) {
    id
    purchased
    purchasedAt
    totalPrice
    totalQuantity
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

const ConnectedApp = () => {
  return (
    <Connect
      query={query(GetCart, { id: localStorage.getItem(FORMIDABLE_CART_ID) })}
      mutation={{
        updateQuantity: mutation(UpdateQuantity),
        purchaseCart: mutation(PurchaseCart),
      }}
    >
      {({ loaded, data, updateQuantity, purchaseCart }) => {
        if (!loaded) {
          return <Loading />;
        }

        const cart = data.getShoppingCart || {};

        return (
          <App
            cart={cart}
            updateQuantity={updateQuantity}
            purchaseCart={purchaseCart}
          />
        );
      }}
    </Connect>
  );
};

export default ConnectedApp;
