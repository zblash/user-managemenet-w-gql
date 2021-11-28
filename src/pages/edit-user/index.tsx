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
import { useUpdateUserMutation } from '@/queries/mutations/use-update-user';

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
  display: flex;
  justify-content: flex-start;
`;
const FormItemWrapper = styled.div`
  width: -moz-calc(50% - 32px);
  width: -webkit-calc(50% - 32px);
  width: calc(50% - 32px);
  float: left;
  margin-right: 16px;
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
  const [updateUser] = useUpdateUserMutation();
  /* EditUserPage Callbacks */
  const onSubmit = React.useCallback(
    (s: any) => {
      console.log(s);
      updateUser({
        variables: {
          id: parseInt(userId, 10),
          name: s.name,
          lastname: s.lastname,
          phone: s.phone,
          birthDate: new Date(),
          email: s.email,
        },
      });
    },
    [updateUser, userId],
  );
  /* EditUserPage Lifecycle  */

  return (
    <>
      {!loading && !error && (
        <PageWrapper>
          <HeaderWrapper>
            <h2>{t('common.user_details')}</h2>
          </HeaderWrapper>
          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormItemWrapper>
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
              </FormItemWrapper>
              <FormItemWrapper>
                <UIInputComponent
                  labelKey="Lastname"
                  type="text"
                  name="lastname"
                  defaultValue={data.users_by_pk.lastname}
                  {...register('lastname', {
                    required: 'Bu Alan Zorunludur.',
                  })}
                  onChange={e => {
                    setValue('lastname', e.target.value);
                  }}
                  errorKey={errors.lastname?.message}
                />
              </FormItemWrapper>
              <FormItemWrapper>
                <UIInputComponent
                  labelKey="Email"
                  type="text"
                  name="email"
                  defaultValue={data.users_by_pk.email}
                  {...register('email', {
                    required: 'Bu Alan Zorunludur.',
                  })}
                  onChange={e => {
                    setValue('email', e.target.value);
                  }}
                  errorKey={errors.email?.message}
                />
              </FormItemWrapper>
              <FormItemWrapper>
                <UIInputComponent
                  labelKey="Phone"
                  type="text"
                  name="phone"
                  defaultValue={data.users_by_pk.phone}
                  {...register('phone', {
                    required: 'Bu Alan Zorunludur.',
                  })}
                  onChange={e => {
                    setValue('phone', e.target.value);
                  }}
                  errorKey={errors.phone?.message}
                />
              </FormItemWrapper>
              <FormItemWrapper>
                <UIInputComponent
                  labelKey="Date of Birth"
                  type="text"
                  name="date_of_birth"
                  defaultValue={data.users_by_pk.date_of_birth}
                  {...register('date_of_birth', {
                    required: 'Bu Alan Zorunludur.',
                  })}
                  onChange={e => {
                    setValue('date_of_birth', e.target.value);
                  }}
                  errorKey={errors.date_of_birth?.message}
                />
              </FormItemWrapper>
              <FormItemWrapper>
                <UIButtonComponent type="submit">Onayla</UIButtonComponent>
              </FormItemWrapper>
            </form>
          </FormWrapper>
        </PageWrapper>
      )}
    </>
  );
}
const PureEditUserPage = React.memo(EditUserPage);

export { PureEditUserPage as EditUserPage };
