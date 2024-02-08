import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';

import { Event } from '@/models/event';
import { User } from '@/models/user';

import { logger } from '@/logger';

export const resolvers = {
  getUser: async ({ email }: { email: string }) => {
    try {
      const user = await User.findOne({ email }).populate('createdEvents');
      return user;
    } catch (err) {
      logger.error('Could not retrieve user. Error details: ' + err);
    }
  },

  getEvents: async () => {
    try {
      const events = await Event.find().populate('createdBy');
      return events;
    } catch (err) {
      logger.error('Could not retrieve events. Error details: ' + err);
    }
  },

  createUser: async ({
    userInput,
  }: {
    userInput: { username: string; email: string; pwd: string };
  }) => {
    const foundUserByEmail = await User.findOne({ email: userInput.email });

    if (foundUserByEmail) {
      logger.error('Could not create user as email in use.');
      throw new Error(
        'Email in use. Please provide alternative email address.'
      );
    }

    const foundUserByUsername = await User.findOne({
      username: userInput.username,
    });

    if (foundUserByUsername) {
      logger.error('Could not create user as email in use.');
      throw new Error(
        'Email in use. Please provide alternative email address.'
      );
    }

    let encryptedPwd;
    try {
      encryptedPwd = await bcrypt.hash(userInput.pwd, 12);
    } catch (err) {
      logger.error('Password could not be hashed. Error details: ' + err);
      throw new Error('Something went wrong submitting the data.');
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
      logger.error('User was not saved. Error details: ' + err);
      throw new Error('Could not save the user.');
    }
  },

  createEvent: async ({
    eventInput,
  }: {
    eventInput: {
      name: string;
      location: string;
      description: string;
      price: number;
      date: string;
      userId: Schema.Types.ObjectId;
    };
  }) => {
    const event = new Event({
      name: eventInput.name,
      location: eventInput.location,
      description: eventInput.description,
      price: eventInput.price,
      date: new Date(eventInput.date),
      createdBy: eventInput.userId,
    });

    try {
      const user = await User.findById(eventInput.userId).populate(
        'createdEvents'
      );

      if (!user) {
        logger.error('Could not save the event without authorised user.');
        throw new Error('Unauthorised to add events.');
      }

      const savedEvent = await event.save();
      user.createdEvents.push(savedEvent._id);
      await user.save();

      return savedEvent;
    } catch (err) {
      logger.error('Event was not saved. Error details: ' + err);
      throw new Error('Could not save the event.');
    }
  },

  bookEvent: async ({
    eventId,
    userId,
  }: {
    eventId: string;
    userId: string;
  }) => {
    try {
      const event = await Event.findById(eventId);
      const user = await User.findById(userId);

      if (!event || !user) {
        logger.error('Could not book event as event or user was not found.');
        throw new Error('Event could not be booked.');
      }

      if (
        event.attendees.includes(userId) ||
        user.attendingEvents.includes(eventId)
      ) {
        throw new Error('You are already booked into this event.');
      }

      event.attendees.push(userId);
      user.attendingEvents.push(eventId);
      await event.save();
      await user.save();
      return event;
    } catch (err) {
      logger.error('Could not book event as event or user was not found.');
      throw new Error('Event could not be booked.');
    }
  },

  cancelBooking: async ({
    eventId,
    userId,
  }: {
    eventId: string;
    userId: string;
  }) => {
    try {
      const event = await Event.findById(eventId);
      const user = await User.findById(userId);

      if (!event || !user) {
        logger.error('Could not cancel event as event or user was not found.');
        throw new Error('Event could not be cancelled.');
      }

      if (
        !event.attendees.includes(userId) ||
        !user.attendingEvents.includes(eventId)
      ) {
        throw new Error('You are not booked into this event.');
      }

      const idx1 = event.attendees.indexOf(userId);
      const idx2 = user.attendingEvents.indexOf(eventId);
      event.attendees.splice(idx1, 1);
      user.attendingEvents.splice(idx2, 1);
      await event.save();
      await user.save();
      return event;
    } catch (err) {
      logger.error('Could not book event as event or user was not found.');
      throw new Error('Event could not be booked.');
    }
  },
};
