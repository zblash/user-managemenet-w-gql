import React, { InputHTMLAttributes } from 'react';

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
        <input
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
