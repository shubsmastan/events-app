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

const createEvent = async (
  {
    name,
    location,
    description,
    price,
    date,
  }: {
    name: string;
    location: string;
    description: string;
    price: number;
    date: string;
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

  const newEvent = new Event({
    name: name,
    location: location,
    description: description,
    price: price,
    date: new Date(date),
    createdBy: userId,
  });

  try {
    const event = await newEvent.save();
    user.createdEvents.push(event._id);
    await user.save();

    return {
      _id: event._id,
      name: event.name,
      description: event.description,
      location: event.location,
      price: event.price,
      attendees: event.attendees,
      createdBy: event.createdBy,
      date: event.date.toISOString(),
    };
  } catch (err) {
    logger.error('Could not create event. Error details: ' + err);
    throw new Error(
      'Event could not be created due to an error. Please try again.'
    );
  }
};

const getEvent = async ({ eventId }: { eventId: string }) => {
  const event = await Event.findById(eventId);

  if (!event) {
    logger.error(`No event with id ${eventId} was found.`);
    throw new Error('Could not find required event - id not in database.');
  }

  return {
    _id: event._id,
    name: event.name,
    description: event.description,
    location: event.location,
    price: event.price,
    attendees: event.attendees,
    createdBy: event.createdBy,
    date: event.date.toISOString(),
  };
};

export const eventResolver = { getEvents, createEvent, getEvent };
