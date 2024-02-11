import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { logger } from '../../logger';

const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const foundUserByEmail = await User.findOne({ email: email });

  if (foundUserByEmail) {
    logger.error('Could not create user as email in use.');
    throw new Error('Email in use. Please provide alternative email address.');
  }

  const foundUserByUsername = await User.findOne({
    username: username,
  });

  if (foundUserByUsername) {
    logger.error('Could not create user as username in use.');
    throw new Error('Username in use. Please provide alternative username.');
  }

  const encryptedPwd = await bcrypt.hash(password, 12);

  const user = new User({
    username: username,
    email: email,
    password: encryptedPwd,
  });

  try {
    return await user.save();
  } catch (err) {
    logger.error('User was not saved. Error details: ' + err);
    throw new Error('Could not save the user.');
  }
};

const userLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const foundUser = await User.findOne({ username });

  let match;
  if (foundUser) {
    match = await bcrypt.compare(password, foundUser.password);
  }

  if (!foundUser || !match) {
    throw new Error('Invalid username and password combination.');
  }

  const token = jwt.sign(
    {
      userId: foundUser._id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '2h' }
  );

  return {
    userId: foundUser._id,
    token,
    tokenExpiry: 2,
  };
};

export const userResolver = { createUser, userLogin };
