import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface UILinkProps {
  to: string;
  state?: object;
  onClick?: () => void;
  children: any;
  type: 'link' | 'button';
}

const StyledButtonNavLink = styled(NavLink)`
  background-color: #36304a;
  border: 1px solid #36304a;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #140e2b;
  }
`;

const StyledLinkNavLink = styled(NavLink)`
  color: #36304a;
  text-decoration: none;
  &:hover {
    color: #140e2b;
  }
`;

function UILink(props: UILinkProps) {
  return (
    <>
      {props.type === 'button' && (
        <StyledButtonNavLink to={{ pathname: props.to, state: props.state }} onClick={props.onClick}>
          {props.children}
        </StyledButtonNavLink>
      )}
      {props.type === 'link' && (
        <StyledLinkNavLink to={{ pathname: props.to, state: props.state }} onClick={props.onClick}>
          {props.children}
        </StyledLinkNavLink>
      )}
    </>
  );
}

const PureUILink = React.memo(UILink);

export { PureUILink as UILink };
