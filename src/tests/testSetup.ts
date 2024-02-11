import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export const dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  (global as any).__MONGOSERVER = mongoServer;
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
};

export const dbDisconnect = async () => {
  const mongoServer = (global as any).__MONGOSERVER;
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
