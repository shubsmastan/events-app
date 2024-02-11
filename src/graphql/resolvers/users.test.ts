import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { connectDb, disconnectDb } from '../../app';
import { userResolver } from './users';

describe('createUser', () => {
  let db;

  beforeAll(async () => {
    db = connectDb();
  });

  afterAll(async () => {
    disconnectDb();
  });

  it('creates a new user', async () => {
    const user = await userResolver.createUser(
      'newguy',
      'newguy@gmail.com',
      'test1234'
    );

    expect(user).toBeDefined();

    user.deleteOne({ _id: user._id });
  });
});
