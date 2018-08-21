import React, { Component } from 'react';
import { Link } from '@reach/router';
import posed from 'react-pose';

import { CartConsumer } from './Cart';

const BouncyButton = posed.div({
  attention: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 10,
      restDelta: true,
      restSpeed: 0.1,
    },
  },
  noAttention: {
    scale: 1,
  },
});

class Header extends Component {
  state = {
    showDropdown: false,
    bounceButton: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.cartCount !== this.props.cartCount) {
      this.setState({ bounceButton: true });
    }
  }

  handleBouncePoseComplete = () => this.setState({ bounceButton: false });

  toggleDropdown = () =>
    this.setState(({ showDropdown }) => ({ showDropdown: !showDropdown }));

  render() {
    const { cartCount } = this.props;
    const showDropdown = this.state.showDropdown ? 'is-active' : null;

    return (
      <header className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <h1 className="title is-3">Formidable Store</h1>
            </Link>

            <span
              role="button"
              className={`navbar-burger burger ${showDropdown}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={this.toggleDropdown}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </span>
          </div>

          <div className={`navbar-menu ${showDropdown}`}>
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Shop
              </Link>

              <Link to="orders" className="navbar-item">
                Orders
              </Link>

              <Link to="contact" className="navbar-item">
                Contact
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <BouncyButton
                  onPoseComplete={this.handleBouncePoseComplete}
                  pose={this.state.bounceButton ? 'attention' : 'noAttention'}
                  className="button is-primary"
                >
                  <Link to="checkout">
                    {`Cart ${cartCount > 0 ? `(${cartCount})` : ''}`}
                  </Link>
                </BouncyButton>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const ConnectedHeader = () => (
  <CartConsumer>
    {({ cart }) => <Header cartCount={cart.totalQuantity} />}
  </CartConsumer>
);

export default ConnectedHeader;
