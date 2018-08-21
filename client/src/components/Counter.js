import React, { Component } from 'react';

const ZERO = 0;
const ONE = 1;

class Counter extends Component {
  static defaultProps = {
    value: ZERO,
  };

  state = {
    value: this.props.defaultValue,
  };

  handleChange = ({ currentTarget: { value } }) => {
    const count = value === '' ? '' : parseInt(value);
    if (count >= ZERO) {
      this.setState({ value: count }, () => {
        this.props.onChange(this.state.value);
      });
    }
  };

  incrementCount = () =>
    this.setState(
      ({ value }) => ({ value: value + ONE }),
      () => this.props.onChange(this.state.value)
    );

  decrementCount = () =>
    this.setState(
      ({ value }) => {
        const count = value - ONE;
        return count <= ZERO ? { value: ZERO } : { value: count };
      },
      () => this.props.onChange(this.state.value)
    );

  render() {
    const { value } = this.state;

    return (
      <div style={{ width: '69px' }}>
        <input
          className="input"
          type="number"
          value={value}
          onChange={this.handleChange}
        />
        <div className="buttons has-addons">
          <button className="button" onClick={this.decrementCount}>
            -
          </button>
          <button className="button" onClick={this.incrementCount}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
