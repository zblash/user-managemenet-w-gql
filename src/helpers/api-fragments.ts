import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFields on users {
    name
    phone
    lastname
    id
    email
    date_of_birth
  }
`;
