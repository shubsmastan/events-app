import { describe, it, expect } from 'vitest';

import { eventResolvers } from './events';
import { userResolvers } from './users';
import { createMockUser } from '../../__mocks__/mocks';

describe('getEvents and createEvent Resolvers', () => {
  const { getEvents } = eventResolvers.Query;
  const { createEvent } = eventResolvers.Mutation;

  it("creates a new event and add it to the a user's created events list", async () => {
    let user = await createMockUser('newguy');
    const context = { authScope: true, userScope: user._id };

    const date = new Date(Date.now()).toISOString();

    const newEvent = {
      name: 'A fun event',
      description: 'A really fun event',
      location: 'Somewhere fun',
      price: 2,
      date,
    };

    const event = await createEvent({}, newEvent, context);

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

    user = await userResolvers.Query.getUser(
      undefined,
      { username: user?.username },
      context
    );

    // not sure why this isn't working!!
    expect(user.createdEvents).toContainEqual(event._id);
  });

  it('gets all recent events', async () => {
    const user = await createMockUser('newdude');
    const context = { authScope: true, userScope: user._id };

    const date = new Date(Date.now()).toISOString();

    for (let i = 0; i < 9; i++) {
      const newEvent = {
        name: `Fun event ${i}`,
        description: 'A really fun event',
        location: 'Somewhere fun',
        price: 2,
        date,
      };
      await createEvent(undefined, newEvent, context);
    }

    const events = await getEvents();
    expect(events).toHaveLength(10);
  });
});
