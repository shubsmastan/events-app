import { describe, it, expect } from 'vitest';

import { bookingResolvers } from './bookings';
import { userResolvers } from './users';
import { createMockEvent, createMockUser } from '../../__mocks__/mocks';
import { eventResolvers } from './events';

describe('bookEvent and cancelBooking resolvers', () => {
  const { bookEvent, cancelBooking } = bookingResolvers.Mutation;

  it('adds user ID to event attendees array and adds event ID to user attendingEvents array', async () => {
    let user = await createMockUser('newguy');
    const context = { authScope: true, userScope: user._id };
    let event = await createMockEvent('An Event Not To Be Missed', context);

    await bookEvent({ eventId: event._id }, context);

    user = await userResolvers.Query.getUser(
      undefined,
      { username: 'newguy' },
      context
    );
    event = await eventResolvers.Query.getEvent(undefined, {
      eventId: event._id,
    });

    expect(user.attendingEvents).toContainEqual(event._id);
    expect(event.attendees).toContainEqual(user._id);
  });

  // TODO: need to check with > 1 event and in different (random) array positions
  it('removes user ID from event attendees array and removes event ID from user attendingEvents array', async () => {
    let user = await createMockUser('newdude');
    const context = { authScope: true, userScope: user._id };
    let event = await createMockEvent('An Evening To Remember', context);

    await bookEvent({ eventId: event._id }, context);

    await cancelBooking(undefined, { eventId: event._id }, context);

    user = await userResolvers.Query.getUser(
      undefined,
      { username: 'newdude' },
      context
    );
    event = await eventResolvers.Query.getEvent(undefined, {
      eventId: event._id,
    });

    expect(user.attendingEvents).toHaveLength(0);
    expect(event.attendees).toHaveLength(0);
  });
});
