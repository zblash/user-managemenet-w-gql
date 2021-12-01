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

export const usersQuery = gql`
  ${USER_FRAGMENT}
  query usersQuery {
    users {
      ...UserFields
    }
  }
`;

export const userByIdQuery = gql`
  ${USER_FRAGMENT}
  query usersByIdQuery($id: Int!) {
    users_by_pk(id: $id) {
      ...UserFields
    }
  }
`;

export const createUserMutation = gql`
  mutation createUserMutation($birthDate: date!, $email: String!, $lastname: String!, $name: String!, $phone: String!) {
    insert_users_one(
      object: { name: $name, lastname: $lastname, phone: $phone, date_of_birth: $birthDate, email: $email }
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

export const deleteUserMutation = gql`
  mutation deleteUserMutation($id: Int!) {
    delete_users_by_pk(id: $id) {
      date_of_birth
      email
      id
      lastname
      name
      phone
    }
  }
`;

export const updateUserMutation = gql`
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
