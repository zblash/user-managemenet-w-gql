import { gql } from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useGraphql } from '@/hocs/useGraphql';

const usersQuery = gql`
  query usersQuery {
    users {
      name
      phone
      lastname
      id
      email
    }
  }
`;

export const useGetAllUsers = () => {
  return useGraphql(usersQuery, {
    onCompleted: () => {
      console.log('mamamam', GraphqlLoadingCounter.getCount());
    },
  });
};
