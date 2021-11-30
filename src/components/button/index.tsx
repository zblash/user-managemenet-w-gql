import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #36304a;
  border: 1px solid #36304a;
  color: #fff;
  padding: 16px 24px;
  border-radius: 4px;
  cursor: pointer;
  min-width: 248px;

  &:hover {
    background-color: #140e2b;
  }
  @media (max-width: 768px) {
    width: 100%;
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
