import React from 'react';
import './Form.css';

class Form extends React.Component {
  state = {
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    errors: []
  };

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { number, expiry, cvc } = this.state;

    const errors = [];

    // very basic assumption that cards will have 16 digits
    const numberRegex = /^[0-9]{16}$/g;
    if (!numberRegex.test(number)) {
      errors.push('Invalid card number');
    }

    // expiry must include a slash,
    // a two digit month between 01-12,
    // and a two digit year
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/g;
    if (!expiryRegex.test(expiry)) {
      errors.push('Invalid expiration format');
    }

    // cvc must have 3 digits
    const cvcRegex = /^[0-9]{3}$/g;
    if (!cvcRegex.test(cvc)) {
      errors.push('Invalid security code');
    }

    this.setState({ errors });
  };

  render() {
    return (
      <div className="Form">
        {this.state.errors.length !== 0 && (
          <ul className="Form-errors">
            {this.state.errors.map(error => (
              <li key={error} className="Form-error">
                {error}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            className="Form-full-name"
            placeholder="Full name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            autoComplete="cc-name"
          />
          <input
            className="Form-card-number"
            placeholder="Card number"
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            autoComplete="cc-name"
          />
          <input
            className="Form-expiry"
            placeholder="MM/YY"
            type="tel"
            name="expiry"
            value={this.state.expiry}
            onChange={this.handleInputChange}
            autoComplete="cc-exp"
          />
          <input
            className="Form-cvc"
            placeholder="CVC"
            type="tel"
            name="cvc"
            value={this.state.cvc}
            onChange={this.handleInputChange}
            autoComplete="cc-csc"
          />
          <input
            type="submit"
            value="Place Order"
            className="Form-place-order"
          />
        </form>
      </div>
    );
  }
}

export default Form;
