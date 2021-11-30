import React from 'react';
import styled from 'styled-components';
import { COLORS } from '@/helpers/constants';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  z-index: 999;
  background: ${COLORS.white};
  display: flex;
`;

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: auto;
  width: 75px;
  height: 75px;

  & .path {
    stroke: ${COLORS.primary};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

function UILoaderComponent() {
  return (
    <StyledWrapper>
      <StyledSpinner viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="2" />
      </StyledSpinner>
    </StyledWrapper>
  );
}

const PureUILoaderComponent = React.memo(UILoaderComponent);

export { PureUILoaderComponent as UILoaderComponent };
