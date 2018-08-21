import { Component } from 'react';

class Form extends Component {
  state = this.props.initialValues;

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
    this.props.onSubmit(this.state);
  };

  render() {
    return this.props.children({
      values: this.state,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    });
  }
}

export default Form;
