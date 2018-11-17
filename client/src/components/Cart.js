import React, { Component, createContext } from 'react';
import { Connect, query, mutation } from 'urql';
import Loading from './Loading';

import { FORMIDABLE_CART_ID } from '../utils/constants';

const CartContext = createContext({
  cart: {},
  updateQuantity: () => {},
  purchaseCart: () => {},
});

class Cart extends Component {
  state = {
    cart: this.props.cart,
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
      this.setState({ cart: {} });
    }
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          updateQuantity: this.updateQuantity,
          purchaseCart: this.purchaseCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

const CartProvider = ({ children }) => {
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
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            purchaseCart={purchaseCart}
          >
            {children}
          </Cart>
        );
      }}
    </Connect>
  );
};

const CartConsumer = CartContext.Consumer;
export { CartProvider, CartConsumer };

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
