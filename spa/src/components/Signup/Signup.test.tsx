import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Signup } from './Signup';

const mockUseNavigate = vi.fn();
const mockLink = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  Link: () => mockLink(),
}));

describe('<Signup />', () => {
  const renderSignup = () => {
    return render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
  };

  it('should have a title', () => {
    const authComponent = renderSignup();
    const heading = authComponent.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Sign Up');
  });
});
