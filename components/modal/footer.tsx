import React from 'react';
import styled from 'styled-components';
import { Button, ModalFooter } from 'reactstrap';

const SytledButton = styled(Button)`
  &.btn-primary.disabled, .btn-primary:disabled {
    cursor: not-allowed;
  }
`;

interface FooterProps {
  validation: {
    isValidName: boolean;
    isValidPhone: boolean;
    isValidEmail: boolean;
  }
  handleSubmit: () => void;
  handleCancel: () => void;
}

export const Footer = ({
  validation,
  handleSubmit,
  handleCancel,
}: FooterProps) => (
    <ModalFooter>
      <SytledButton
        disabled={!validation.isValidEmail || !validation.isValidName || !validation.isValidPhone}
        color="primary"
        onClick={handleSubmit}
      >
        Submit
    </SytledButton>{' '}
      <SytledButton
        color="secondary"
        onClick={handleCancel}
      >
        Cancel
    </SytledButton>
    </ModalFooter>
  )