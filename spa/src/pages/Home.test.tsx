import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Home } from './Home';

describe('<Home />', () => {
  it('should have a title', () => {
    const wrapper = render(<Home />);

    const heading = wrapper.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Event Bookings App');
  });
});
