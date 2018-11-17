import React, { Component } from 'react';
import { Connect, query } from 'urql';
import { priceInDollars } from '../utils';
import Loading from '../components/Loading';
import Counter from '../components/Counter';
import { CartConsumer } from '../components/Cart';

class DetailPage extends Component {
  state = {
    quantity: 1,
  };

  addToCart = () => {
    const { quantity } = this.state;
    if (quantity > 0) {
      const { id: productId, updateQuantity } = this.props;
      updateQuantity({ productId, quantity });
    }
  };

  changeQuantity = quantity => this.setState({ quantity });

  render() {
    const { quantity } = this.state;
    const { name, imageUrl, price } = this.props;

    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <figure className="image is-4by3">
              <img src={imageUrl} alt={name} />
            </figure>
          </div>
          <div className="column is-one-quarter">
            <div className="title is-1">{name}</div>
            <div className="subtitle is-3">{priceInDollars(price)}</div>
            <Counter defaultValue={quantity} onChange={this.changeQuantity} />
            <a
              className="button is-primary is-medium"
              onClick={this.addToCart}
              disabled={quantity === 0}
            >
              ADD TO CART
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export const GetProduct = `
query($productId: ID!) {
  getProduct(id: $productId) {
    id
    name
    imageUrl
    price
  }
}
`;

const ConnectedDetailPage = ({ productId }) => {
  return (
    <Connect query={query(GetProduct, { productId })}>
      {({ loaded, data }) => {
        if (!loaded) {
          return <Loading />;
        }

        return (
          <CartConsumer>
            {({ updateQuantity }) => (
              <DetailPage
                {...data.getProduct}
                updateQuantity={updateQuantity}
              />
            )}
          </CartConsumer>
        );
      }}
    </Connect>
  );
};

export default ConnectedDetailPage;
