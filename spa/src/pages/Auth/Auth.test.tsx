import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Auth } from './Auth';

describe('Auth page', () => {
  it('should have a title', () => {
    const wrapper = render(<Auth />);

    const heading = wrapper.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Auth');
  });
});
