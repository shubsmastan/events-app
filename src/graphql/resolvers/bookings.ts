import { Event } from '@/models/event';
import { User } from '@/models/user';

import { logger } from '@/logger';

const bookEvent = async ({
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
};

const cancelBooking = async ({
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
};

export const bookingResolver = { bookEvent, cancelBooking };
