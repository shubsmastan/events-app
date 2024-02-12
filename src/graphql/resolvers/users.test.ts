import { describe, it, expect } from 'vitest';

import { userResolver } from './users';

describe('createUser Resolver', () => {
  const { createUser } = userResolver;

  it('creates a new user', async () => {
    const user = await createUser('newguy', 'newguy@gmail.com', 'test1234');

    expect(user).toEqual({
      _id: user._id,
      username: 'newguy',
      email: 'newguy@gmail.com',
      createdEvents: [],
      attendingEvents: [],
    });
  });

  it('throws an error if as user registers with an existing username', async () => {
    expect(async () => {
      await userResolver.createUser(
        'newguy',
        'newguynew@gmail.com',
        'test1234'
      );
    }).rejects.toThrow('Username in use');
  });

  it('throws an error if as user registers with an existing email', async () => {
    expect(async () => {
      await userResolver.createUser(
        'newguynew',
        'newguy@gmail.com',
        'test1234'
      );
    }).rejects.toThrow('Email in use');
  });
});
