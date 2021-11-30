import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UILink } from '../link';
import { COLORS } from '@/helpers/constants';

const HeaderWrapper = styled.div`
  width: calc(100% - 64px);
  margin-bottom: 24px;
  min-height: 50px;
  background-color: ${COLORS.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 32px;
`;

const LinkWrapper = styled.div`
  padding-right: 16px;
  margin-right: 16px;
  border-right: 1px solid ${COLORS.gray};

  &:last-child {
    border-right: 0;
  }
`;

function UIHeaderComponent() {
  const { t } = useTranslation();

  return (
    <HeaderWrapper>
      <LinkWrapper>
        <UILink type="link" to="/">
          {t('common.home')}
        </UILink>
      </LinkWrapper>
      <LinkWrapper>
        <UILink type="link" to="/create-user">
          {t('common.create-user')}
        </UILink>
      </LinkWrapper>
    </HeaderWrapper>
  );
}

const PureUIHeaderComponent = React.memo(UIHeaderComponent);

export { PureUIHeaderComponent as UIHeaderComponent };
