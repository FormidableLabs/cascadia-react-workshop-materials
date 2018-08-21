import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  name: '',
  number: '',
  expiry: '',
  cvc: '',
};

var CreditCardSchema = yup.object().shape({
  name: yup.string().required('Required'),
  number: yup
    .string()
    .min(16, 'Too short!')
    .max(16, 'Too long!')
    .required('Required'),
  expiry: yup.string().required('Required'),
  cvc: yup.string().required('Required'),
});

const CreditCardForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={CreditCardSchema}
  >
    {({ values, handleChange, handleSubmit, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Full Name</label>
          <div className="control">
            <input
              className="input"
              placeholder="Taylor Swift"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              data-testid="name-input"
            />
            <p className="help is-danger">
              {touched.name && errors.name ? errors.name : null}
            </p>
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
              value={values.number}
              onChange={handleChange}
              data-testid="number-input"
            />
            <p className="help is-danger">
              {touched.number && errors.number ? errors.number : null}
            </p>
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
                  value={values.expiry}
                  onChange={handleChange}
                  data-testid="expiry-input"
                />
                <p className="help is-danger">
                  {touched.expiry && errors.expiry ? errors.expiry : null}
                </p>
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
                  value={values.cvc}
                  onChange={handleChange}
                  data-testid="cvc-input"
                />
                <p className="help is-danger">
                  {touched.cvc && errors.cvc ? errors.cvc : null}
                </p>
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
    )}
  </Formik>
);

export default CreditCardForm;
