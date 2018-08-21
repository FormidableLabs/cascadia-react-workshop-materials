import React, { Component } from 'react';
import { HOME, CHECKOUT, ORDERS, CONTACT } from '../utils/constants';

class Header extends Component {
  state = {
    showDropdown: false,
  };

  toggleDropdown = () =>
    this.setState(({ showDropdown }) => ({ showDropdown: !showDropdown }));

  render() {
    const { updateRoute, cartCount } = this.props;
    const showDropdown = this.state.showDropdown ? 'is-active' : null;

    return (
      <header className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <h1
                className="title is-3"
                onClick={() => updateRoute({ route: HOME })}
              >
                Formidable Store
              </h1>
            </a>

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
              <a
                className="navbar-item"
                onClick={() => updateRoute({ route: HOME })}
              >
                Shop
              </a>

              <a
                className="navbar-item"
                onClick={() => updateRoute({ route: ORDERS })}
              >
                Orders
              </a>

              <a
                className="navbar-item"
                onClick={() => updateRoute({ route: CONTACT })}
              >
                Contact
              </a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="button is-primary">
                  <a onClick={() => updateRoute({ route: CHECKOUT })}>
                    {`Cart ${cartCount > 0 ? `(${cartCount})` : ''}`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
