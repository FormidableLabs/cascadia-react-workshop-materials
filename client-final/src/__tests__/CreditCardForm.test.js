import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import CreditCardForm from '../components/CreditCardForm';

test('submits a name, number, expiry, and cvc values', async () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<CreditCardForm onSubmit={onSubmit} />);
  const nameInput = getByTestId('name-input');
  const numberInput = getByTestId('number-input');
  const expiryInput = getByTestId('expiry-input');
  const cvcInput = getByTestId('cvc-input');
  const submitInput = getByTestId('submit-input');

  const name = 'John Smith';
  const number = '1234123412341234';
  const expiry = '12/12';
  const cvc = '123';

  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(numberInput, { target: { value: number } });
  fireEvent.change(expiryInput, { target: { value: expiry } });
  fireEvent.change(cvcInput, { target: { value: cvc } });
  fireEvent.click(submitInput);

  expect(nameInput.value).toEqual(name);
  expect(numberInput.value).toEqual(number);
  expect(expiryInput.value).toEqual(expiry);
  expect(cvcInput.value).toEqual(cvc);
  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
