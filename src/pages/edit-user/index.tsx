import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useHistory } from 'react-router';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { UIButtonComponent } from '@/components/button';
import { useGetUserById } from '@/queries/use-get-user-by-id';
import { UIInputComponent } from '@/components/input';
import { useUpdateUserMutation } from '@/queries/mutations/use-update-user';
import { UIContainerComponent } from '@/components/container';
import { COLORS } from '@/helpers/constants';
import { dateObjectToBackendDateFormat } from '@/helpers/date-helper';

interface RouteParams {
  userId: string;
}

const HeaderWrapper = styled.div`
  width: 100%;
  color: #fff;
  background-color: ${COLORS.primary};
  padding: 16px;
  border: 1px solid ${COLORS.primary};
  border-radius: 10px 10px 0 0;
`;
const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLORS.gray};
  padding: 16px;
  border-top: 0;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: flex-start;
`;
const FormItemWrapper = styled.div`
  width: 100%;
  float: left;
  margin-bottom: 1rem;
`;

function EditUserPage() {
  /* EditUserPage Variables */
  const { t } = useTranslation();
  const { userId } = useParams<RouteParams>();
  const routerHistory = useHistory();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { loading, error, data } = useGetUserById(parseInt(userId, 10));
  const { mutate: updateUser, mutateLoading, mutateError } = useUpdateUserMutation();

  /* EditUserPage Callbacks */
  const onSubmit = React.useCallback(
    (s: any) => {
      updateUser({
        variables: {
          id: parseInt(userId, 10),
          name: s.name,
          lastname: s.lastname,
          phone: s.phone,
          birthDate: dateObjectToBackendDateFormat(s.date_of_birth),
          email: s.email,
        },
      }).then(() => {
        routerHistory.push('/');
      });
    },
    [updateUser, routerHistory, userId],
  );
  /* EditUserPage Lifecycle  */

  return (
    <>
      {!loading && !error && !mutateLoading && !mutateError && (
        <UIContainerComponent>
          <>
            <HeaderWrapper>
              <h2>{t('common.user_details')}</h2>
            </HeaderWrapper>
            <FormWrapper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormItemWrapper>
                  <UIInputComponent
                    labelKey={t('common.name')}
                    type="text"
                    name="name"
                    defaultValue={data.users_by_pk.name}
                    {...register('name', {
                      required: t('common.warnings.required').toString(),
                    })}
                    onChange={e => {
                      setValue('name', e.target.value);
                    }}
                    errorKey={errors.name?.message}
                  />
                </FormItemWrapper>
                <FormItemWrapper>
                  <UIInputComponent
                    labelKey={t('common.lastname')}
                    type="text"
                    name="lastname"
                    defaultValue={data.users_by_pk.lastname}
                    {...register('lastname', {
                      required: t('common.warnings.required').toString(),
                    })}
                    onChange={e => {
                      setValue('lastname', e.target.value);
                    }}
                    errorKey={errors.lastname?.message}
                  />
                </FormItemWrapper>
                <FormItemWrapper>
                  <UIInputComponent
                    labelKey={t('common.email')}
                    type="text"
                    name="email"
                    defaultValue={data.users_by_pk.email}
                    {...register('email', {
                      required: t('common.warnings.required').toString(),
                    })}
                    onChange={e => {
                      setValue('email', e.target.value);
                    }}
                    errorKey={errors.email?.message}
                  />
                </FormItemWrapper>
                <FormItemWrapper>
                  <UIInputComponent
                    labelKey={t('common.phone')}
                    type="text"
                    name="phone"
                    defaultValue={data.users_by_pk.phone}
                    {...register('phone', {
                      required: t('common.warnings.required').toString(),
                    })}
                    onChange={e => {
                      setValue('phone', e.target.value);
                    }}
                    errorKey={errors.phone?.message}
                  />
                </FormItemWrapper>
                <FormItemWrapper>
                  <Controller
                    control={control}
                    name="date_of_birth"
                    rules={{ required: t('common.warnings.required').toString() }}
                    defaultValue={Date.parse(data.users_by_pk.date_of_birth)}
                    render={({ field: { onChange, value, ref } }) => (
                      <DatePicker
                        selected={value}
                        onChange={onChange}
                        customInput={
                          <UIInputComponent
                            labelKey={t('common.date_of_birth')}
                            type="text"
                            name="date_of_birth"
                            onChange={e => {
                              setValue('date_of_birth', e.target.value);
                            }}
                            errorKey={errors.date_of_birth?.message}
                          />
                        }
                      />
                    )}
                  />
                </FormItemWrapper>
                <FormItemWrapper>
                  <UIButtonComponent type="submit">{t('common.form.submit')}</UIButtonComponent>
                </FormItemWrapper>
              </form>
            </FormWrapper>
          </>
        </UIContainerComponent>
      )}
    </>
  );
}
const PureEditUserPage = React.memo(EditUserPage);

export { PureEditUserPage as EditUserPage };
