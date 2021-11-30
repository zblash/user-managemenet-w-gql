import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useGraphqlMutation } from '@/hocs/useGraphql';
import { useAlert } from '@/hocs/use-alert';

const updateUserMutation = gql`
  mutation updateUserMutation(
    $id: Int!
    $birthDate: date!
    $email: String!
    $lastname: String!
    $name: String!
    $phone: String!
  ) {
    update_users_by_pk(
      _set: { name: $name, lastname: $lastname, phone: $phone, date_of_birth: $birthDate, email: $email }
      pk_columns: { id: $id }
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

export const useUpdateUserMutation = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useGraphqlMutation(updateUserMutation, {
    onCompleted: () => {
      alert.show(`${t('common.messages.edit.user.success')}`, {
        type: 'success',
      });
    },
    onError: () => {
      alert.show(`${t('common.messages.edit.user.error')}`, {
        type: 'error',
      });
    },
  });
};
