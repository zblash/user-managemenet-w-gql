import { gql } from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useGraphql } from '@/hocs/useGraphql';
import { USER_FRAGMENT } from '@/helpers/api-fragments';

const userByIdQuery = gql`
  ${USER_FRAGMENT}
  query usersByIdQuery($id: Int!) {
    users_by_pk(id: $id) {
      ...UserFields
    }
  }
`;

export const useGetUserById = (id: number) => {
  return useGraphql(userByIdQuery, {
    variables: { id },
    onCompleted: () => {
      console.log('mamamam', GraphqlLoadingCounter.getCount());
    },
  });
};
