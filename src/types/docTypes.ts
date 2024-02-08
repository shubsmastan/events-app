import { Schema } from 'mongoose';

export interface Event {
  _id: string;
  name: string;
  desc: string;
  price: number;
  date: Date;
  createdBy: Schema.Types.ObjectId;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  pwd: string;
  createdEvents: string[];
  attendingEvents: string[];
}
