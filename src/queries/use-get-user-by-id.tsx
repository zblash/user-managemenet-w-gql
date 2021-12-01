import { useGraphqlQuery } from '@/hocs/useGraphql';
import { userByIdQuery } from '@/helpers/api-fragments';

export const useGetUserById = (id: number) => {
  return useGraphqlQuery(userByIdQuery, {
    variables: { id },
  });
};
