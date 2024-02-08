import { Schema } from 'mongoose';

export interface Event {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  date: Date;
  createdBy: Schema.Types.ObjectId;
  attendees: string[];
}

export interface User {
  _id: string;
  username: string;
  email: string;
  pwd: string;
  createdEvents: string[];
  attendingEvents: string[];
}
