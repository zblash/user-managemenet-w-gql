import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export interface UIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
}

const UIInputComponent = React.forwardRef<HTMLInputElement, UIInputProps>(
  ({ labelKey, name, errorKey, placeholderKey, type = 'text', ...rest }, ref) => {
    return (
      <div>
        {labelKey && <label htmlFor={name}>{labelKey}</label>}
        <StyledInput
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholderKey}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? 'true' : 'false'}
          {...rest}
        />
        {errorKey && (
          <div id={`${name}Feedback`} className="invalid-feedback d-block">
            {errorKey}
          </div>
        )}
      </div>
    );
  },
);

const PureUIInputComponent = React.memo(UIInputComponent);

export { PureUIInputComponent as UIInputComponent };
