import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from './ContactForm';

test('should allow user to type first name with length greater than 0', () => {
  const container = document.body;
  const { getByLabelText } = render(<ContactForm />);

  const inputNode = getByLabelText('First Name*', {
    selector: 'input',
  });
});
