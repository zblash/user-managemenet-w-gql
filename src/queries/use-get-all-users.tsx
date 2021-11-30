import { gql } from '@apollo/client';
import { useGraphqlQuery } from '@/hocs/useGraphql';
import { USER_FRAGMENT } from '@/helpers/api-fragments';

const usersQuery = gql`
  ${USER_FRAGMENT}
  query usersQuery {
    users {
      ...UserFields
    }
  }
`;

export const useGetAllUsers = () => {
  return useGraphqlQuery(usersQuery);
};
