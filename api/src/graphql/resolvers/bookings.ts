import { Event } from '../../models/event';
import { User } from '../../models/user';

import { logger } from '../../logger';
import { RequestContext } from '../../types';

export const bookingResolvers = {
  Mutation: {
    bookEvent: async (
      {
        eventId,
      }: {
        eventId: string;
      },
      { authScope: authenticated, userScope: userId }: RequestContext
    ) => {
      if (!authenticated || !userId) {
        logger.debug('Could not book event as user is unauthenticated.');
        throw new Error(
          'Event could not be booked - user is not authenticated.'
        );
      }

      const user = await User.findById(userId);

      if (!user) {
        logger.error('Could not book event as user was not found.');
        throw new Error('Event could not be booked - invalid user ID.');
      }

      const event = await Event.findById(eventId);

      if (!event) {
        logger.error('Could not book event as event was not found.');
        throw new Error('Event could not be booked - invalid event ID.');
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
        logger.error(
          'Could not book event as an error occured. Error details: ' + err
        );
        throw new Error(
          'Event could not be booked due to a server error. Please try again.'
        );
      }
    },

    cancelBooking: async (
      _: any,
      {
        eventId,
      }: {
        eventId: string;
      },
      { authScope: authenticated, userScope: userId }: RequestContext
    ) => {
      if (!authenticated || !userId) {
        logger.debug('Could not cancel booking as user was not authenticated.');
        throw new Error(
          'Booking could not be cancelled - user is not authenticated.'
        );
      }

      const user = await User.findById(userId);

      if (!user) {
        logger.error('Could not book event as user was not found.');
        throw new Error('Booking could not be cancelled - invalid user ID.');
      }

      const event = await Event.findById(eventId);

      if (!event) {
        logger.error('Could not book event as event was not found.');
        throw new Error('Booking could not be cancelled - invalid event ID.');
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
        logger.error(
          'Could not cancel booking as an error occured. Error details: ' + err
        );
        throw new Error(
          'Booking could not be cancelled due to a server error. Please try again.'
        );
      }
    },
  },
};
