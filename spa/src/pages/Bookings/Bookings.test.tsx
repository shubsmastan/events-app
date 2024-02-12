import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Bookings } from './Bookings';

describe('Bookings page', () => {
  it('should have a title', () => {
    const wrapper = render(<Bookings />);

    const heading = wrapper.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Bookings');
  });
});
