import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('should have a title', () => {
    const wrapper = render(<App />);

    const heading = wrapper.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Events Booking App');
  });
});
