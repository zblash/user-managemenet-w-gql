import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '@/helpers/constants';

interface UILinkProps {
  to: string;
  state?: object;
  onClick?: () => void;
  children: any;
  type: 'link' | 'button';
}

const StyledButtonNavLink = styled(NavLink)`
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

const StyledLinkNavLink = styled(NavLink)`
  color: ${COLORS.primary};
  text-decoration: none;
  &:hover {
    color: ${COLORS.secondary};
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
