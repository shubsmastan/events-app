import mongoose, { Schema } from 'mongoose';

import { User as UserType } from '@/types/docTypes';

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  // events: {
  //   type: Array,
  // },
});

export const User = mongoose.model('User', UserSchema);
