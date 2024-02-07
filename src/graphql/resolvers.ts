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
    const user = new User({
      username: userInput.username,
      email: userInput.email,
      pwd: userInput.pwd, // needs to be hashed!!!!!!!
    });
    try {
      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      logger.error('User was not saved. Error details: ' + err);
      throw new Error('Could not save the user.');
    }
  },

  createEvent: async ({
    eventInput,
  }: {
    eventInput: { name: string; desc: string; price: number; date: string };
  }) => {
    const event = new Event({
      name: eventInput.name,
      desc: eventInput.desc,
      price: eventInput.price,
      date: new Date(eventInput.date),
    });
    try {
      const savedEvent = await event.save();
      return savedEvent;
    } catch (err) {
      logger.error('Event was not saved. Error details: ' + err);
      throw new Error('Could not save the event.');
    }
  },
};
