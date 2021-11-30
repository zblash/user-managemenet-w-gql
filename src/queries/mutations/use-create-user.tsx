import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useGraphqlMutation } from '@/hocs/useGraphql';
import { useAlert } from '@/hocs/use-alert';

const createUserMutation = gql`
  mutation createUserMutation($birthDate: date!, $email: String!, $lastname: String!, $name: String!, $phone: String!) {
    insert_users_one(
      object: { name: $name, lastname: $lastname, phone: $phone, date_of_birth: $birthDate, email: $email }
    ) {
      date_of_birth
      email
      id
      lastname
      name
      phone
    }
  }
`;

export const useCreateUserMutation = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useGraphqlMutation(createUserMutation, {
    onCompleted: () => {
      alert.show(`${t('common.messages.create.user.success')}`, {
        type: 'success',
      });
    },
    onError: () => {
      alert.show(`${t('common.messages.create.user.error')}`, {
        type: 'error',
      });
    },
  });
};
