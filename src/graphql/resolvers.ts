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
      throw new Error('Could not find any user with that email.');
    }
  },

  getEvents: async () => {
    try {
      const events = await Event.find().populate('createdBy');
      return events;
    } catch (err) {
      logger.error('Could not retrieve events. Error details: ' + err);
      throw new Error('Error finding events. Please try again.');
    }
  },

  createUser: async ({
    userInput,
  }: {
    userInput: { username: string; email: string; password: string };
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

    const user = await User.findById(eventInput.userId).populate(
      'createdEvents'
    );

    if (!user) {
      logger.error('Could not save the event as user is not registered.');
      throw new Error('Not able to add events without an account.');
    }

    try {
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

    try {
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

    try {
      const idx1 = event.attendees.indexOf(userId);
      const idx2 = user.attendingEvents.indexOf(eventId);
      event.attendees.splice(idx1, 1);
      user.attendingEvents.splice(idx2, 1);
      await event.save();
      await user.save();
      return event;
    } catch (err) {
      logger.error('Could not book event as event or user was not found.');
      throw new Error('Event could not be cancelled.');
    }
  },
};
