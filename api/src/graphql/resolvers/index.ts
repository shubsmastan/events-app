import { userResolver } from './users';
import { eventResolver } from './events';
import { bookingResolver } from './bookings';

export const rootResolver = {
  ...userResolver,
  ...eventResolver,
  ...bookingResolver,
};
