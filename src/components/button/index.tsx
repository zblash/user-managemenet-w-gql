import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/helpers/constants';

const StyledButton = styled.button`
  background-color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  color: ${COLORS.white};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${COLORS.secondary};
  }
`;

function UIButtonComponent(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton onClick={props.onClick} type={props.type}>
      {props.children}
    </StyledButton>
  );
}

const PureUIButtonComponent = React.memo(UIButtonComponent);

export { PureUIButtonComponent as UIButtonComponent };
