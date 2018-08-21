import React, { Component } from 'react';
import { Link } from '@reach/router';
import posed from 'react-pose';

import { priceInDollars } from '../utils';
import { CartConsumer } from './Cart';

const Container = posed.div({
  active: { transform: 'scale(1.05)' },
  inactive: { transform: 'scale(1)' },
});

class Product extends Component {
  state = {
    hovered: false,
  };

  handleOnMouseEnter = () => this.setState({ hovered: true });
  handleOnMouseLeave = () => this.setState({ hovered: false });

  addToCart = e => {
    e.stopPropagation();
    const productId = this.props.product.id;
    this.props.updateQuantity({ productId, quantity: 1 });
  };

  render() {
    const { imageUrl, name, price, id } = this.props.product;

    return (
      <Container
        pose={this.state.hovered ? 'active' : 'inactive'}
        className="card"
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
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
          <Link to={`product/${id}`} className="card-footer-item">
            Details
          </Link>
          <span
            style={{ cursor: 'pointer', color: '#3273DC' }}
            className="card-footer-item"
            onClick={this.addToCart}
          >
            Add to cart
          </span>
        </footer>
      </Container>
    );
  }
}

const ConnectedProduct = ({ product }) => (
  <CartConsumer>
    {({ updateQuantity }) => (
      <Product product={product} updateQuantity={updateQuantity} />
    )}
  </CartConsumer>
);

export default ConnectedProduct;
