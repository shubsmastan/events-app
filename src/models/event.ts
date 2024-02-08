import mongoose, { Schema } from 'mongoose';

import { Event as EventType } from '@/types/docTypes';

const EventSchema = new Schema<EventType>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const Event = mongoose.model('Event', EventSchema);
