import React from 'react';
import { render, fireEvent, cleanup, wait } from 'react-testing-library';
import ContactForm from '../components/ContactForm';

afterEach(cleanup);

test('submits a name and message values', async () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<ContactForm onSubmit={onSubmit} />);
  const nameInput = getByTestId('name-input');
  const messageInput = getByTestId('message-input');
  const submitInput = getByTestId('submit-input');

  const name = 'John Smith';
  const message = 'How are you?';

  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(messageInput, { target: { value: message } });
  fireEvent.click(submitInput);

  expect(nameInput.value).toEqual(name);
  expect(messageInput.value).toEqual(message);

  await wait(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
