import { useTranslation } from 'react-i18next';
import { useGraphqlMutation } from '@/hocs/useGraphql';
import { useAlert } from '@/hocs/use-alert';
import { updateUserMutation, usersQuery } from '@/helpers/api-fragments';

export const useUpdateUserMutation = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useGraphqlMutation(updateUserMutation, {
    refetchQueries: [{ query: usersQuery }],
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
