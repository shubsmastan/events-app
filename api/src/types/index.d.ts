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
  password: string;
  createdEvents: string[];
  attendingEvents: string[];
}

declare global {
  namespace Express {
    export interface Request {
      authenticated?: boolean;
      userId?: string;
    }
  }

  namespace jwt {
    export interface JwtPayload {
      userId: string;
    }
  }
}

export interface RequestContext {
  authScope: boolean;
  userScope: string;
}
