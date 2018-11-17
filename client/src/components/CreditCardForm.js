import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  number: '',
  expiry: '',
  cvc: '',
};

const CreditCardSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  number: Yup.string()
    .min(16, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  expiry: Yup.string().required('Required'),
  cvc: Yup.string()
    .min(3, 'Too Short!')
    .max(3, 'Too Long!')
    .required('Required'),
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
            <p className="help is-danger">{touched.name && errors.name}</p>
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
            <p className="help is-danger">{touched.number && errors.number}</p>
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
                  {touched.expiry && errors.expiry}
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
                <p className="help is-danger">{touched.cvc && errors.cvc}</p>
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
