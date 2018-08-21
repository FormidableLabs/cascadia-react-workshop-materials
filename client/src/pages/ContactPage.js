import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';
import { Connect, mutation } from 'urql';
import { HOME } from '../utils/constants';

class ContactPage extends Component {
  submitContactInfo = async ({ name, message }) => {
    if (name && message) {
      const { submitContactInfo, updateRoute } = this.props;
      await submitContactInfo({ name, message });
      updateRoute({ route: HOME });
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

const ConnectedContactPage = ({ updateRoute }) => {
  return (
    <Connect mutation={{ submitContactInfo: mutation(SubmitContactInfo) }}>
      {({ submitContactInfo }) => {
        return (
          <ContactPage
            submitContactInfo={submitContactInfo}
            updateRoute={updateRoute}
          />
        );
      }}
    </Connect>
  );
};

export default ConnectedContactPage;
