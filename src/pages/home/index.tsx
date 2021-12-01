import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useGetAllUsers } from '@/queries/use-get-all-users';
import { UITableComponent } from '@/components/table';
import { IUser } from '@/helpers/api-models';
import { UILink } from '@/components/link';
import { UIContainerComponent } from '@/components/container';
import { useDeleteUserMutation } from '@/queries/mutations/use-delete-user';
import { UIButtonComponent } from '@/components/button';

const StyledButtonWrapper = styled.div`
  margin-left: 8px;
  float: left:
`;

function HomePage() {
  /* HomePage Variables */
  const { t } = useTranslation();
  const { loading, error, data } = useGetAllUsers();
  const { mutate: deleteUser, mutateLoading, mutateError } = useDeleteUserMutation();
  /* HomePage Callbacks */

  const onDeleteUser = React.useCallback(
    (id: number) => {
      deleteUser({
        variables: {
          id,
        },
      });
    },
    [deleteUser],
  );
  /* HomePage Lifecycle  */

  return (
    <UIContainerComponent>
      {!loading && !error && !mutateLoading && !mutateError && (
        <UITableComponent
          columns={[
            {
              Header: t('common.id'),
              accessor: 'id',
            },
            {
              Header: t('common.name'),
              accessor: 'name',
            },
            {
              Header: t('common.lastname'),
              accessor: 'lastname',
            },
            {
              Header: t('common.phone'),
              accessor: 'phone',
            },
            {
              Header: t('common.email'),
              accessor: 'email',
            },
            {
              Header: t('common.date_of_birth'),
              accessor: 'date_of_birth',
            },
            {
              Header: '',
              accessor: 'transactions',
              customRenderer: (item: IUser) => (
                <>
                  <StyledButtonWrapper>
                    <UILink type="button" to={`/edit-user/${item.id}`}>
                      {t('common.details')}
                    </UILink>
                  </StyledButtonWrapper>
                  <StyledButtonWrapper>
                    <UIButtonComponent
                      type="button"
                      onClick={() => {
                        onDeleteUser(item.id);
                      }}
                    >
                      {t('common.delete-user')}
                    </UIButtonComponent>
                  </StyledButtonWrapper>
                </>
              ),
            },
          ]}
          data={data.users as IUser[]}
        />
      )}
    </UIContainerComponent>
  );
}
const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
