import express from "express";
// import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fs from "fs";
import { resolvers } from "./graphql/resolvers";

const PORT = process.env.PORT || 3300;

const graphqlSchema = fs.readFileSync(
  require.resolve("./schema.graphql"),
  "utf-8"
);

const app = express();

app.get("/", (_, res) => {
  res.send("Hello Faerun!");
});

app.use(
  "/api",
  graphqlHTTP({
    schema: buildSchema(graphqlSchema),
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
