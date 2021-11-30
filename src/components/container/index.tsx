import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 75%;
  margin: auto;
  @media (max-width: 768px) {
    width: 90%;
    margin: inherit;
  }
`;

function UIContainerComponent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <PageWrapper>{props.children}</PageWrapper>;
}

const PureUIContainerComponent = React.memo(UIContainerComponent);

export { PureUIContainerComponent as UIContainerComponent };
