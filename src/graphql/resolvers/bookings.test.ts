import { describe, it, expect } from 'vitest';

import { bookingResolver } from './bookings';
import { userResolver } from './users';
import { createMockEvent, createMockUser } from '../../__mocks__/mocks';
import { eventResolver } from './events';

describe('bookEvent and cancelBooking resolvers', () => {
  const { bookEvent, cancelBooking } = bookingResolver;

  it('adds user ID to event attendees array and adds event ID to user attendingEvents array', async () => {
    let user = await createMockUser('newguy');
    const mockRequest: any = { authenticated: true, userId: user._id };
    let event = await createMockEvent('An Event Not To Be Missed', mockRequest);

    await bookEvent({ eventId: event._id }, mockRequest);

    user = await userResolver.getUser({ username: 'newguy' }, mockRequest);
    event = await eventResolver.getEvent({ eventId: event._id });

    expect(user.attendingEvents).toContainEqual(event._id);
    expect(event.attendees).toContainEqual(user._id);
  });

  // TODO: need to check with > 1 event and in different (random) array positions
  it('removes user ID from event attendees array and removes event ID from user attendingEvents array', async () => {
    let user = await createMockUser('newdude');
    const mockRequest: any = { authenticated: true, userId: user._id };
    let event = await createMockEvent('An Evening To Remember', mockRequest);

    await bookEvent({ eventId: event._id }, mockRequest);

    await cancelBooking({ eventId: event._id }, mockRequest);

    user = await userResolver.getUser({ username: 'newdude' }, mockRequest);
    event = await eventResolver.getEvent({ eventId: event._id });

    expect(user.attendingEvents).toHaveLength(0);
    expect(event.attendees).toHaveLength(0);
  });
});
