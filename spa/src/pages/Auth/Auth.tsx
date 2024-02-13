import { FormEvent, useState } from 'react';

import { AuthForm, FormSection, FormActions } from './Auth.styled';

export const Auth = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  // const { username, password } = formData;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // if (username.trim().length === 0 || password.trim().length === 0) {
    //   return;
    // }
  };

  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      <AuthForm onSubmit={handleSubmit}>
        <h1>Auth</h1>
        <FormSection>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
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
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}></input>
        </FormSection>
        <FormActions>
          <button type="submit">Log In</button>
        </FormActions>
      </AuthForm>
      {/* {error &&
        error.graphQLErrors.map(({ message }, i) => {
          <span key={i}>{message}</span>;
        })} */}
    </>
  );
};
