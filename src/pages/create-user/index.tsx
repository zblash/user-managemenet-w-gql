import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { UIButtonComponent } from '@/components/button';
import { UIInputComponent } from '@/components/input';
import { UIContainerComponent } from '@/components/container';
import { COLORS } from '@/helpers/constants';
import { useCreateUserMutation } from '@/queries/mutations/use-create-user';
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

function CreateUserPage() {
  /* CreateUserPage Variables */
  const { t } = useTranslation();
  const routerHistory = useHistory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutate: createUser, mutateLoading, mutateError } = useCreateUserMutation();

  /* CreateUserPage Callbacks */
  const onSubmit = React.useCallback(
    (s: any) => {
      createUser({
        variables: {
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
    [createUser, routerHistory],
  );
  /* CreateUserPage Lifecycle  */

  return (
    <>
      {!mutateLoading && !mutateError && (
        <UIContainerComponent>
          <>
            <HeaderWrapper>
              <h2>{t('common.create-user')}</h2>
            </HeaderWrapper>
            <FormWrapper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormItemWrapper>
                  <UIInputComponent
                    labelKey={t('common.name')}
                    type="text"
                    name="name"
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
                    defaultValue={new Date()}
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
const PureCreateUserPage = React.memo(CreateUserPage);

export { PureCreateUserPage as CreateUserPage };
