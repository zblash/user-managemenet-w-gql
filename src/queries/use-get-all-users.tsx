import { gql } from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useGraphql } from '@/hocs/useGraphql';
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
  return useGraphql(usersQuery);
};
