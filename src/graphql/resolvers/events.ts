import { Schema } from 'mongoose';

import { Event } from '@/models/event';
import { User } from '@/models/user';

import { logger } from '@/logger';

const getEvents = async () => {
  try {
    const events = await Event.find().populate('createdBy');
    return events;
  } catch (err) {
    logger.error('Could not retrieve events. Error details: ' + err);
    throw new Error('Error finding events. Please try again.');
  }
};

export const createEvent = async ({
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

  const user = await User.findById(eventInput.userId).populate('createdEvents');

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
};

export const eventResolver = { getEvents, createEvent };
