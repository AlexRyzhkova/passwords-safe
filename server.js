require("dotenv").config();
const express = require("express");
const createPasswordsRouter = require("./routes/passwordsRoutes");
const createUsersRouter = require("./routes/usersRoutes");

const { MongoClient } = require("mongodb");
//Inhalt (body ) wird analysiert un dem wird ein Wert gegeben
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});
//app.use middelware- alle Anfrgaen werden zuerst in app.use bearbeitet( alle Routes)
app.use(bodyParser.json());
app.use(cookieParser());

app.use((request, response, next) => {
  console.log(`Request ${request.method} on ${request.url}`);
  next();
});

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.use("/api/passwords", createPasswordsRouter(database, masterPassword));
  app.use("/api/users", createUsersRouter(database));

  // app.get("/", (request, response) => {
  //   response.sendFile(__dirname + "/index.html");
  // });

  app.listen(3000, function () {
    console.log("listening on 3000");
  });
}

main();
