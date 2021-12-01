import { useGraphqlQuery } from '@/hocs/useGraphql';
import { usersQuery } from '@/helpers/api-fragments';

export const useGetAllUsers = () => {
  return useGraphqlQuery(usersQuery);
};
