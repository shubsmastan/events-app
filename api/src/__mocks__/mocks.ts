import { Request } from 'express';

import { userResolver } from '../graphql/resolvers/users';
import { eventResolver } from '../graphql/resolvers/events';

export const createMockUser = async (username: string) => {
  const user = await userResolver.createUser({
    username,
    email: `${username}@gmail.com`,
    password: 'test1234',
  });
  return user;
};

export const createMockEvent = async (name: string, req: Request) => {
  const date = new Date(Date.now()).toISOString();

  const event = await eventResolver.createEvent(
    {
      name,
      description: 'A mock event',
      location: 'Somewhere in Faerun',
      price: 3,
      date,
    },
    req
  );
  return event;
};
