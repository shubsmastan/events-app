import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { logger } from './logger';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/types';
import { verifyUser } from './middleware/auth';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const PORT = parseInt(process.env.PORT ? process.env.PORT : '3300');

const app = express();

const server = new ApolloServer<{ authScope: boolean; userScope: string }>({
  typeDefs,
  resolvers,
});

app.use(verifyUser);

app.get('/', (_, res) => {
  res.send('Hello Faerun!');
});

(async () => {
  await server.start();
  app.use(
    '/api',
    cors({
      origin: process.env.FRONTEND_URL,
    }),
    express.json(),
    expressMiddleware(server as unknown as ApolloServer, {
      context: async ({ req }) => ({
        authScope: req.authenticated,
        userScope: req.userId,
      }),
    })
  );
})();

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('Environment variables not set.');
}

const connectDb = async (uri: string) => {
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.asPromise();
    return db;
  }
  try {
    const db = await mongoose.connect(uri, {
      dbName: 'events-app',
    });
    logger.info('Successfully connected to database');
    return db;
  } catch (err: any) {
    logger.error(err.toString());
  }
};

if (process.env.NODE_ENV !== 'test') {
  connectDb(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.otlz3us.mongodb.net/?retryWrites=true&w=majority`
  );
}

if (process.env.NODE_ENV === 'dev') {
  app.listen(PORT, 'localhost', () => {
    logger.info(`Server listening on port ${PORT} (developer mode)`);
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}
