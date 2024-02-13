import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll } from 'vitest';

const dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  (global as any).__MONGOSERVER = mongoServer;
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
};

const dbDisconnect = async () => {
  const mongoServer = (global as any).__MONGOSERVER;
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

beforeAll(async () => {
  dbConnect();
});

afterAll(async () => {
  dbDisconnect();
});
