import express from "express";
// import bodyParser from "body-parser";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello Faerun!");
});

const PORT = process.env.PORT || 3300;

app.listen(PORT);
