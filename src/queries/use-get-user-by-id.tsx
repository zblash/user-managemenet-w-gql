import { gql } from '@apollo/client';
import { useGraphqlQuery } from '@/hocs/useGraphql';
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
  return useGraphqlQuery(userByIdQuery, {
    variables: { id },
  });
};
