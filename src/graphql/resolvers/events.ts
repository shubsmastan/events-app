import { Request } from 'express';

import { Event } from '../../models/event';
import { User } from '../../models/user';

import { logger } from '../../logger';

const getEvents = async () => {
  try {
    const events = await Event.find().populate('createdBy');
    return events;
  } catch (err) {
    logger.error('Could not retrieve events. Error details: ' + err);
    throw new Error(
      'Events could not be loaded due to an error. Please try again.'
    );
  }
};

export const createEvent = async (
  {
    eventInput,
  }: {
    eventInput: {
      name: string;
      location: string;
      description: string;
      price: number;
      date: string;
    };
  },
  req: Request
) => {
  const { authenticated, userId } = req;

  if (!authenticated || !userId) {
    logger.debug('Could not create event as user was not authenticated.');
    throw new Error('Event could not be created - user is not authenticated.');
  }

  const user = await User.findById(userId).populate('createdEvents');

  if (!user) {
    logger.error('Could not create event as user was not found.');
    throw new Error('Event could not be booked - invalid user ID.');
  }

  const event = new Event({
    name: eventInput.name,
    location: eventInput.location,
    description: eventInput.description,
    price: eventInput.price,
    date: new Date(eventInput.date),
    createdBy: userId,
  });

  try {
    const savedEvent = await event.save();
    user.createdEvents.push(savedEvent._id);
    await user.save();

    return savedEvent;
  } catch (err) {
    logger.error('Could not create event. Error details: ' + err);
    throw new Error(
      'Event could not be created due to an error. Please try again.'
    );
  }
};

export const eventResolver = { getEvents, createEvent };
