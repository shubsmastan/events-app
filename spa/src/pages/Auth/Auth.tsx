import { useLazyQuery } from '@apollo/client';
import { FormEvent, useEffect, useState } from 'react';

import { AuthForm, FormSection, FormActions, Errors } from './Auth.styled';
import { USER_LOGIN_QUERY } from '../../mutations';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<string[]>([]);

  const { username, password } = formData;

  // TODO: need to type data
  const [userLogin, { data, loading, error }] = useLazyQuery(USER_LOGIN_QUERY);

  useEffect(() => {
    if (data?.userLogin.token) {
      navigate('/events');
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error?.graphQLErrors.length) {
      setErrors(error.graphQLErrors.map(({ message }) => message));
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.trim().length === 0 || password.trim().length === 0) {
      setErrors(['Please enter all fields.']);
      return;
    }

    await userLogin({ variables: { username, password } });
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <h1>Auth</h1>
        <FormSection>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            data-test="username-input"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}></input>
        </FormSection>
        <FormSection>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            data-test="password-input"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}></input>
        </FormSection>
        <FormActions>
          <button type="submit" data-test="login-button">
            Log In
          </button>
        </FormActions>
      </AuthForm>
      {loading && <p>Please wait...</p>}
      <Errors>
        {errors.map((err, idx) => {
          return <span key={idx}>{err}</span>;
        })}
      </Errors>
    </>
  );
};
