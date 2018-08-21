import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';
import { Connect, mutation } from 'urql';
import { navigate } from '@reach/router';

class ContactPage extends Component {
  submitContactInfo = async ({ name, message }) => {
    if (name && message) {
      const { submitContactInfo } = this.props;
      await submitContactInfo({ name, message });
      navigate('/');
    }
  };

  render() {
    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <ContactForm onSubmit={this.submitContactInfo} />
          </div>
        </div>
      </div>
    );
  }
}

export const SubmitContactInfo = `
mutation($name: String!, $message: String!) {
  submitContactInfo(name: $name, message: $message) {
    name
    message
  }
}
`;

const ConnectedContactPage = () => {
  return (
    <Connect mutation={{ submitContactInfo: mutation(SubmitContactInfo) }}>
      {({ submitContactInfo }) => {
        return <ContactPage submitContactInfo={submitContactInfo} />;
      }}
    </Connect>
  );
};

export default ConnectedContactPage;
