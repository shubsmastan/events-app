import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavBar } from './NavBar';

describe('NavBar component', () => {
  it('should have a title', () => {
    const wrapper = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(wrapper).toBeTruthy();
  });
});
