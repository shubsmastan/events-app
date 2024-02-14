import { userResolvers } from './users';
import { eventResolvers } from './events';
import { bookingResolvers } from './bookings';
import { merge } from 'lodash';

export const resolvers = merge(
  {},
  userResolvers,
  eventResolvers,
  bookingResolvers
);
