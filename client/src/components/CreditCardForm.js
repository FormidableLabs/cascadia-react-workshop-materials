import React, { Component } from 'react';

const initialValues = {
  name: '',
  number: '',
  expiry: '',
  cvc: '',
};

class CreditCardForm extends Component {
  state = initialValues;

  handleChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit({ ...this.state });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Full Name</label>
          <div className="control">
            <input
              className="input"
              placeholder="Taylor Swift"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              data-testid="name-input"
            />
            <p className="help is-danger">{null}</p>
          </div>
        </div>
        <div className="field">
          <label className="label">Card Number</label>
          <div className="control">
            <input
              className="input"
              placeholder="1234123412341234"
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              data-testid="number-input"
            />
            <p className="help is-danger">{null}</p>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Expiration Date</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="MM/YY"
                  type="tel"
                  name="expiry"
                  value={this.state.expiry}
                  onChange={this.handleChange}
                  data-testid="expiry-input"
                />
                <p className="help is-danger">{null}</p>
              </div>
            </div>
            <div className="field">
              <label className="label">CVC</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="CVC"
                  type="tel"
                  name="cvc"
                  value={this.state.cvc}
                  onChange={this.handleChange}
                  data-testid="cvc-input"
                />
                <p className="help is-danger">{null}</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="field">
          <div className="control">
            <input
              type="submit"
              value="Place Order"
              className="button is-primary"
              data-testid="submit-input"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default CreditCardForm;
