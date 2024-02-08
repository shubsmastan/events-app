import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';

import { Event } from '@/models/event';
import { User } from '@/models/user';

import { logger } from '@/logger';

export const resolvers = {
  events: async () => {
    try {
      const events = await Event.find();
      return events;
    } catch (err) {
      logger.error('Could not retrieve events. Error details: ' + err);
      return null;
    }
  },

  createUser: async ({
    userInput,
  }: {
    userInput: { username: string; email: string; pwd: string };
  }) => {
    const foundUser = await User.findOne({ email: userInput.email });

    if (foundUser) {
      logger.debug('Could not create user as email in use.');
      throw new Error(
        'Email in use. Please provide alternative email address.'
      );
    }

    let encryptedPwd;
    try {
      encryptedPwd = await bcrypt.hash(userInput.pwd, 12);
    } catch (err) {
      logger.error('Password could not be hashed. Error details: ' + err);
    }

    const user = new User({
      username: userInput.username,
      email: userInput.email,
      pwd: encryptedPwd,
    });

    try {
      const savedUser = await user.save();
      return { ...savedUser, password: 'Removed' };
    } catch (err) {
      logger.debug('User was not saved. Error details: ' + err);
      throw new Error('Could not save the user.');
    }
  },

  createEvent: async ({
    eventInput,
  }: {
    eventInput: {
      name: string;
      desc: string;
      price: number;
      date: string;
      createdBy: Schema.Types.ObjectId;
    };
  }) => {
    const event = new Event({
      name: eventInput.name,
      desc: eventInput.desc,
      price: eventInput.price,
      date: new Date(eventInput.date),
      createdBy: eventInput.createdBy,
    });

    try {
      const user = await User.findById(eventInput.createdBy);

      if (!user) {
        logger.info('Could not save the event without authorised user.');
        throw new Error('Unauthorised to add events.');
      }

      const savedEvent = await event.save();
      user.createdEvents.push(savedEvent._id);

      return savedEvent;
    } catch (err) {
      logger.debug('Event was not saved. Error details: ' + err);
      throw new Error('Could not save the event.');
    }
  },
};
