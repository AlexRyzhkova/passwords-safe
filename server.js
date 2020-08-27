const express = require("express");
require("dotenv").config();
//generiert eine App
const app = express();
const { MongoClient } = require("mongodb");
const { readPassword } = require("./lib/passwords");
const { decrypt } = require("./lib/crypto");

const client = new MongoClient(process.env.MONGO_URI);
const masterPassword = "123";

async function main() {
  await client.connect();

  const database = client.db(process.env.MONGO_DB_NAME);

  app.get("/api/password/lidl", async (request, response) => {
    const key = "lidl";
    const encryptedPassword = await readPassword(key, database);
    const password = decrypt(encryptedPassword, masterPassword);
    response.send(password);
  });

  //höre auf folgenden port - listen
  app.listen(3000, function () {
    console.log("listening on 3000");
  });
}

main();
