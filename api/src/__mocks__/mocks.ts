import { userResolvers } from '../graphql/resolvers/users';
import { eventResolvers } from '../graphql/resolvers/events';
import { RequestContext } from '../types';

export const createMockUser = async (username: string) => {
  const user = await userResolvers.Mutation.createUser(
    {},
    {
      username,
      email: `${username}@gmail.com`,
      password: 'test1234',
    }
  );
  return user;
};

export const createMockEvent = async (
  name: string,
  context: RequestContext
) => {
  const date = new Date(Date.now()).toISOString();

  const event = await eventResolvers.Mutation.createEvent(
    {},
    {
      name,
      description: 'A mock event',
      location: 'Somewhere in Faerun',
      price: 3,
      date,
    },
    context
  );
  return event;
};
