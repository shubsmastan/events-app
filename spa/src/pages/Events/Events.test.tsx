import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Events } from './Events';

describe('Events page', () => {
  it('should have a title', () => {
    const wrapper = render(<Events />);

    const heading = wrapper.container.querySelector('h1');

    expect(heading?.textContent).toEqual('Events');
  });
});
