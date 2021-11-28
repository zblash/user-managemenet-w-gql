import { gql } from '@apollo/client';
import { GraphqlLoadingCounter } from '@/hocs/graphql-loading-counter';
import { useGraphql } from '@/hocs/useGraphql';
import { USER_FRAGMENT } from '@/helpers/api-fragments';

import { useMutation, DocumentNode, QueryHookOptions } from '@apollo/client';

const updateUserMutation = gql`
  mutation updateUserMutation(
    $id: Int!
    $birthDate: date!
    $email: String!
    $lastname: String!
    $name: String!
    $phone: String!
  ) {
    update_users_by_pk(
      _set: { name: $name, lastname: $lastname, phone: $phone, date_of_birth: $birthDate, email: $email }
      pk_columns: { id: $id }
    ) {
      date_of_birth
      email
      id
      lastname
      name
      phone
    }
  }
`;

export const useUpdateUserMutation = () => {
  return useMutation(updateUserMutation, {
    onCompleted: () => {
      console.log('mamamam', GraphqlLoadingCounter.getCount());
    },
  });
};
