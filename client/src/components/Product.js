import React, { Component } from 'react';
import { priceInDollars } from '../utils';
import { DETAIL } from '../utils/constants';
import { CartConsumer } from './Cart';

const ONE = 1;

class Product extends Component {
  navigateTo = () => {
    const productId = this.props.product.id;
    this.props.updateRoute({ route: DETAIL, params: { productId } });
  };

  addToCart = e => {
    e.stopPropagation();
    const productId = this.props.product.id;
    this.props.updateQuantity({ productId, quantity: ONE });
  };

  render() {
    const { imageUrl, name, price } = this.props.product;

    return (
      <div className="card" onClick={this.navigateTo}>
        <div className="card-image">
          <figure className="image is-5by3">
            <img src={imageUrl} alt={name} />
          </figure>
        </div>
        <div className="card-content" style={{ minHeight: 200 }}>
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{priceInDollars(price)}</p>
          </div>
          <br />
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
            <br />
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Details
          </a>
          <span
            style={{ cursor: 'pointer', color: '#3273DC' }}
            className="card-footer-item"
            onClick={this.addToCart}
          >
            Add to cart
          </span>
        </footer>
      </div>
    );
  }
}

const ConnectedProduct = ({ updateRoute, product }) => (
  <CartConsumer>
    {({ updateQuantity }) => (
      <Product
        product={product}
        updateRoute={updateRoute}
        updateQuantity={updateQuantity}
      />
    )}
  </CartConsumer>
);

export default ConnectedProduct;
