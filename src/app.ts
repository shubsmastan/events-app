import express from "express";
// import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fs from "fs";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello Faerun!");
});

app.use(
  "/api",
  graphqlHTTP({
    schema: buildSchema(
      `${fs.readFileSync(require.resolve("./schema.graphql"), "utf-8")}`
    ),
    rootValue: {
      events: () => {
        return ["One", "Two", "Three"];
      },
      createEvent: ({ name }: { name: string }) => {
        return name;
      },
    },
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
