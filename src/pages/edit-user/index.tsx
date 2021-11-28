import * as React from 'react';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useTranslation } from 'react-i18next';
import { IUser } from '@/helpers/api-models';
import { UIButtonComponent } from '@/components/button';
import { useParams } from 'react-router';
import { useGetUserById } from '@/queries/use-get-user-by-id';
import styled from 'styled-components';
import { UIInputComponent } from '@/components/input';
import { useForm } from 'react-hook-form';

interface RouteParams {
  userId: string;
}

const PageWrapper = styled.div`
  width: 75%;
  margin: auto;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  color: #fff;
  background-color: #36304a;
  padding: 16px;
  border: 1px solid #36304a;
  border-radius: 10px 10px 0 0;
`;
const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  padding: 16px;
  border-top: 0;
  border-radius: 0 0 10px 10px;
`;

function EditUserPage() {
  /* EditUserPage Variables */
  const { t } = useTranslation();
  const { userId } = useParams<RouteParams>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm();
  const { loading, error, data } = useGetUserById(parseInt(userId, 10));
  /* EditUserPage Callbacks */

  /* EditUserPage Lifecycle  */

  return (
    <>
      {GraphqlLoadingCounter.getCount() > -1 && (
        <PageWrapper>
          <HeaderWrapper>
            <h2>{t('common.user_details')}</h2>
          </HeaderWrapper>
          <FormWrapper>
            <UIInputComponent
              labelKey="Name"
              type="text"
              name="name"
              defaultValue={data.users_by_pk.name}
              {...register('name', {
                required: 'Bu Alan Zorunludur.',
              })}
              onChange={e => {
                setValue('name', e.target.value);
              }}
              errorKey={errors.name?.message}
            />
          </FormWrapper>
        </PageWrapper>
      )}
    </>
  );
}
const PureEditUserPage = React.memo(EditUserPage);

export { PureEditUserPage as EditUserPage };
