import { useTranslation } from 'react-i18next';
import { useGraphqlMutation } from '@/hocs/useGraphql';
import { useAlert } from '@/hocs/use-alert';
import { createUserMutation, usersQuery } from '@/helpers/api-fragments';

export const useCreateUserMutation = () => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useGraphqlMutation(createUserMutation, {
    refetchQueries: [{ query: usersQuery }],
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
