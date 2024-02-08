import bcrypt from 'bcryptjs';

import { User } from '@/models/user';

import { logger } from '@/logger';

const createUser = async ({
  userInput,
}: {
  userInput: { username: string; email: string; password: string };
}) => {
  const foundUserByEmail = await User.findOne({ email: userInput.email });

  if (foundUserByEmail) {
    logger.error('Could not create user as email in use.');
    throw new Error('Email in use. Please provide alternative email address.');
  }

  const foundUserByUsername = await User.findOne({
    username: userInput.username,
  });

  if (foundUserByUsername) {
    logger.error('Could not create user as username in use.');
    throw new Error('Username in use. Please provide alternative username.');
  }

  const encryptedPwd = await bcrypt.hash(userInput.password, 12);

  const user = new User({
    username: userInput.username,
    email: userInput.email,
    password: encryptedPwd,
  });

  try {
    return await user.save();
  } catch (err) {
    logger.error('User was not saved. Error details: ' + err);
    throw new Error('Could not save the user.');
  }
};

export const userResolver = { createUser };
