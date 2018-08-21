import React, { Component } from 'react';
import OrderList from '../components/OrderList';

class OrdersPage extends Component {
  state = {
    customerName: '',
  };

  handleNameChange = ({ target: { value: customerName } }) =>
    this.setState({ customerName });

  render() {
    const { customerName } = this.state;

    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <input
              className="input"
              type="text"
              placeholder="Order Name"
              value={customerName}
              onChange={this.handleNameChange}
            />
            <OrderList customerName={customerName} />
          </div>
        </div>
      </div>
    );
  }
}

export default OrdersPage;
