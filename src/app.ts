import express from 'express';
// import bodyParser from "body-parser";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import { resolvers } from './graphql/resolvers';
import { createLogger, format, transports } from 'winston';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();

const PORT = process.env.PORT || 3300;

const logger = createLogger({
  format: format.printf((info) => {
    let message = `${new Date(
      Date.now()
    ).toUTCString()} | ${info.level.toUpperCase()} | ${info.message}`;
    message += info.obj ? `data:${JSON.stringify(info.obj)} | ` : '';
    return message;
  }),
  transports: [new transports.Console()],
});

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
    rootValue: resolvers,
    graphiql: true,
  })
);

const dbClient = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.otlz3us.mongodb.net/?retryWrites=true&w=majority`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const run = async () => {
  try {
    await dbClient.db('admin').command({ ping: 1 });
    logger.info('Successfully connected to database');
  } catch (err: any) {
    logger.error(err.toString());
    throw new Error('Could not connect to database');
  } finally {
    await dbClient.close();
  }
};
run();

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
