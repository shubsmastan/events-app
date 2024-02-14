import { gql } from '@apollo/client';

export const mutationUserLogin = gql`
  query UserLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      userId
      token
      tokenExpiry
    }
  }
`;
