// import styled from 'styled-components';

import { Login } from '../../components/Login';
import { Signup } from '../../components/Signup';

export const Auth = ({ type }: { type: 'login' | 'signup' }) => {
  if (type === 'signup')
    return (
      <>
        <Signup />
      </>
    );

  return (
    <>
      <Login />
    </>
  );
};
