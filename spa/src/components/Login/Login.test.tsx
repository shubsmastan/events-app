import { MockedProvider } from '@apollo/react-testing';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Login } from './Login';

const mockUseNavigate = vi.fn();
const mockLink = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  Link: () => mockLink(),
}));

describe('<Login />', () => {
  const renderLogin = () => {
    return render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );
  };

  it('should have a title', () => {
    const authComponent = renderLogin();
    const heading = authComponent.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Log In');
  });

  it('should throw an error if field(s) are empty', () => {
    const authComponent = renderLogin();

    const usernameInput = authComponent.container.querySelector(
      '[data-test="username-input"]'
    ) as HTMLInputElement;

    const passwordInput = authComponent.container.querySelector(
      '[data-test="password-input"]'
    ) as HTMLInputElement;

    const loginButton = authComponent.container.querySelector(
      '[data-test="login-button"]'
    ) as HTMLButtonElement;

    expect(usernameInput.value).toEqual('');
    expect(passwordInput.value).toEqual('');

    fireEvent.click(loginButton);

    const error = authComponent.getByText('Please enter all fields.');

    expect(error).toBeTruthy();
  });
});
