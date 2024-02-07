import { Event } from '../models/event';
import { Event as EventType } from '@/types/Events';
import { logger } from '@/logger';

const events: EventType[] = [];

export const resolvers = {
  events: () => {
    return events;
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
      logger.error('Event was not saved' + err);
      throw new Error('Could not save the event');
    }
  },
};
