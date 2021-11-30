import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/helpers/constants';

const StyledInput = styled.input`
  width: calc(100% - 6px);
  padding: 12px 0 12px 6px;
  border: 1px solid ${COLORS.gray};
  border-radius: 4px;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.5 rem;
`;

const StyledWrapper = styled.div`
  margin-bottom: 1 rem;
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
      <StyledWrapper>
        {labelKey && <StyledLabel htmlFor={name}>{labelKey}</StyledLabel>}
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
      </StyledWrapper>
    );
  },
);

const PureUIInputComponent = React.memo(UIInputComponent);

export { PureUIInputComponent as UIInputComponent };
