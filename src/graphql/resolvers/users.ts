import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { logger } from '../../logger';

const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
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

  const newUser = new User({
    username: username,
    email: email,
    password: encryptedPwd,
  });

  try {
    const user = await newUser.save();
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdEvents: user.createdEvents,
      attendingEvents: user.attendingEvents,
    };
  } catch (err) {
    logger.error('User was not saved. Error details: ' + err);
    throw new Error('Could not save the user.');
  }
};

const getUser = async ({ username }: { username: string }) => {
  const user = await User.findOne({ username });

  if (!user) {
    logger.error(`No user with username ${username} was found.`);
    throw new Error('Could not find required user - username not in database.');
  }

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdEvents: user.createdEvents,
    attendingEvents: user.attendingEvents,
  };
};

const userLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const foundUser = await User.findOne({ username: username });

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
  } catch (err) {
    console.log(err);
  }
};

export const userResolver = { createUser, getUser, userLogin };
