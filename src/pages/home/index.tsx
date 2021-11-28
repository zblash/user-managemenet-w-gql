import * as React from 'react';
import { useGetAllUsers } from '@/queries/use-get-all-users';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { UITableComponent } from '@/components/table';
import { useTranslation } from 'react-i18next';
import { IUser } from '@/helpers/api-models';
import { UILink } from '@/components/link';

function HomePage() {
  /* HomePage Variables */
  const { t } = useTranslation();
  const { loading, error, data } = useGetAllUsers();
  /* HomePage Callbacks */

  /* HomePage Lifecycle  */

  return (
    <>
      {!loading && !error && (
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
                <UILink type="button" to={`/edit-user/${item.id}`}>
                  {t('common.details')}
                </UILink>
              ),
            },
          ]}
          data={data.users as IUser[]}
        />
      )}
    </>
  );
}
const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
