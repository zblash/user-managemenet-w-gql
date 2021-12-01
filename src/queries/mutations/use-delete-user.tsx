import { useTranslation } from 'react-i18next';
import { useGraphqlMutation } from '@/hocs/useGraphql';
import { useAlert } from '@/hocs/use-alert';
import { deleteUserMutation, usersQuery } from '@/helpers/api-fragments';

export const useDeleteUserMutation = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useGraphqlMutation(deleteUserMutation, {
    refetchQueries: [{ query: usersQuery }],
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
