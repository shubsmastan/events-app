import express from 'express';
// import bodyParser from "body-parser";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

import { rootResolver } from '@/graphql/resolvers';
import { logger } from '@/logger';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();

const PORT = process.env.PORT || 3300;

const graphqlSchema = fs.readFileSync(
  require.resolve('./schema.graphql'),
  'utf-8'
);

app.get('/', (_, res) => {
  res.send('Hello Faerun!');
});

app.use(
  '/api',
  graphqlHTTP({
    schema: buildSchema(graphqlSchema),
    rootValue: rootResolver,
    graphiql: true,
  })
);

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('Environment variables not set.');
}

(async () => {
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.asPromise();
    return db;
  }
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.otlz3us.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: 'events-app',
      }
    );
    logger.info('Successfully connected to database');
    return db;
  } catch (err: any) {
    logger.error(err.toString());
    throw new Error('Could not connect to database.');
  }
})();

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
