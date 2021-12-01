import { gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useGraphqlMutation } from '@/hocs/useGraphql';
import { useAlert } from '@/hocs/use-alert';

const deleteUserMutation = gql`
  mutation deleteUserMutation($id: Int!) {
    delete_users_by_pk(id: $id) {
      date_of_birth
      email
      id
      lastname
      name
      phone
    }
  }
`;

export const useDeleteUserMutation = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useGraphqlMutation(deleteUserMutation, {
    onCompleted: () => {
      alert.show(`${t('common.messages.remove.user.success')}`, {
        type: 'success',
      });
    },
    onError: () => {
      alert.show(`${t('common.messages.remove.user.error')}`, {
        type: 'error',
      });
    },
  });
};
