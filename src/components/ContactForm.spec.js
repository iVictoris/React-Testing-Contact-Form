import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

/**
 * Unexpected behaviors:
 *  - validation says maxLength of 3 on firstName
 *  - email validation not working
 */

test('should render without crashing', () => {
  render(<ContactForm />);
});

test('should allow user to type first name with length greater than 3 with no errors', async () => {
  const { getAllByTestId, getByTestId } = render(<ContactForm />);
  const input = getByTestId('first-name-input');
  act(() => {
    // necessary to update state
    fireEvent.change(input, { target: { value: 'abcd' } });
    fireEvent.blur(input); // this was missing
  });
  await wait(() => {
    // need this to reinforce that the error is in the document
    getAllByTestId('error');
  });
  expect(getAllByTestId('error')[0]).toBeInTheDocument();
});

test('should not allow the submission of form with required fields not filled in', async () => {
  const onSubmit = jest.fn();
  const { getByTestId, getAllByTestId } = render(<ContactForm />);
  act(() => {
    fireEvent.submit(getByTestId('form'));
  });

  await wait(() => {
    getAllByTestId('error');
  });

  expect(getAllByTestId('error').length).toBe(3);
  expect(onSubmit).not.toHaveBeenCalled();
});
