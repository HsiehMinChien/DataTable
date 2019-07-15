import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Label } from 'reactstrap';

import { StyledSpan } from '..';

const StyledLabel = styled(Label)`
  margin-top: 20px;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const StyledWarningBar = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
`

interface CustomzieInputType {
  isValid: boolean;
  placeholder?: string;
  title: string;
  warningString?: string;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refs: React.MutableRefObject<any>;
  value: string;
  needFilled?: boolean;
}

export const CustomzieInput = ({
  isValid,
  title,
  placeholder = '',
  warningString = '',
  onBlur,
  onChange,
  refs,
  value,
  needFilled = false,
}: CustomzieInputType) => (
    <>
      <StyledLabel for={title}>{needFilled && <StyledSpan>{`* `}</StyledSpan>}{title}</StyledLabel>
      <StyledInput
        className={classnames({ 'form-control is-invalid': isValid })}
        ref={refs}
        id={title}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {isValid && <StyledWarningBar>{warningString}</StyledWarningBar>}
    </>
  )