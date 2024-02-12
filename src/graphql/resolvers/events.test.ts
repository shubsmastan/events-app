import { describe, it, expect } from 'vitest';

import { eventResolver } from './events';
import { userResolver } from './users';

describe('getEvents and createEvent Resolvers', () => {
  it("creates a new event and add it to the a user's created events list", async () => {
    let user = await userResolver.createUser({
      username: 'newguy',
      email: 'newguy@gmail.com',
      password: 'test1234',
    });
    const mockRequest: any = { authenticated: true, userId: user._id };
    const { createEvent } = eventResolver;

    const date = new Date(Date.now()).toISOString();

    const newEvent = {
      name: 'A fun event',
      description: 'A really fun event',
      location: 'Somewhere fun',
      price: 2,
      date,
    };

    const event = await createEvent(newEvent, mockRequest);

    expect(event).toEqual({
      _id: event._id,
      name: 'A fun event',
      description: 'A really fun event',
      location: 'Somewhere fun',
      price: 2,
      date,
      attendees: [],
      createdBy: user._id,
    });

    user = await userResolver.getUser({ username: user?.username });

    // not sure why this isn't working!!
    expect(user.createdEvents).toContainEqual(event._id);
  });

  // it('gets all recent events', async () => {});
});
