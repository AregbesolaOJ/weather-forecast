import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

export function Button({ ...props }) {
  return (
    <BootstrapButton size="sm" data-testid="myButton" {...props}>
      Go Back
    </BootstrapButton>
  );
}
// jest.useFakeTimers();
