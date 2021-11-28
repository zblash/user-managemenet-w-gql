import * as React from 'react';
import { useGetAllUsers } from '@/queries/use-get-all-users';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { UITableComponent } from '@/components/table';
import { useTranslation } from 'react-i18next';
import { IUser } from '@/helpers/api-models';
import { UIButtonComponent } from '@/components/button';

function HomePage() {
  /* HomePage Variables */
  const { t } = useTranslation();
  const { loading, error, data } = useGetAllUsers();
  /* HomePage Callbacks */

  /* HomePage Lifecycle  */

  return (
    <>
      {GraphqlLoadingCounter.getCount() > -1 && (
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
              Header: '',
              accessor: 'transactions',
              customRenderer: (item: IUser) => (
                <UIButtonComponent type="button">{t('common.details')}</UIButtonComponent>
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
