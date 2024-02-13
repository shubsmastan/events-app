import { gql } from '@apollo/client';

export const USER_LOGIN_QUERY = gql`
  query UserLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      userId
      token
      tokenExpiry
    }
  }
`;
