import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavBarItem } from './NavBarItem';

describe('NavBarItem component', () => {
  it('should have a title', () => {
    const wrapper = render(
      <MemoryRouter>
        <NavBarItem link="test" text="test" />
      </MemoryRouter>
    );

    expect(wrapper).toBeTruthy();
  });
});
