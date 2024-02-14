import { MockedProvider } from '@apollo/react-testing';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Auth } from './Auth';
// import { USER_LOGIN_QUERY } from '../../mutations';

const mockUseNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('<Auth />', () => {
  const renderAuth = () => {
    return render(
      <MockedProvider>
        <Auth />
      </MockedProvider>
    );
  };

  it('should have a title', () => {
    const authComponent = renderAuth();
    const heading = authComponent.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Auth');
  });

  it('should throw an error if field(s) are empty', () => {
    const authComponent = renderAuth();

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
