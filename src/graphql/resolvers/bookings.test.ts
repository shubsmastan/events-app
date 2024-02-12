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

    user = await userResolver.getUser({ username: 'newguy' });
    event = await eventResolver.getEvent({ eventId: event._id });

    expect(user.attendingEvents).toContainEqual(event._id);
    expect(event.attendees).toContainEqual(user._id);
  });

  // it('removes user ID to event attendees array and removes event ID to user attendingEvents array', async () => {
  //   let user = await userResolver.getUser({ username: 'newguy' });
  //   const mockRequest: any = { authenticated: true, userId: user._id };
  //   let event = await eventResolver.getEvent({
  //     eventId: user.attendingEvents[0]!,
  //   });

  //   cancelBooking({ eventId: event._id }, mockRequest);

  //   user = await userResolver.getUser({ username: 'newguy' });
  //   event = await eventResolver.getEvent({ eventId: event._id });

  //   console.log(user.attendingEvents);

  //   expect(user.attendingEvents).toHaveLength(0);
  //   expect(event.attendees).toHaveLength(0);
  // });
});
