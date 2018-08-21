import React, { Component } from 'react';

const initialValues = {
  name: '',
  message: '',
};

class ContactForm extends Component {
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
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
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
          <div className="control">
            <textarea
              className="textarea"
              placeholder="messsage"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              data-testid="message-input"
            />
            <p className="help is-danger">{null}</p>
          </div>
        </div>
        <br />
        <div className="field">
          <div className="control">
            <input
              type="submit"
              value="Submit Form"
              className="button is-primary"
              data-testid="submit-input"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
