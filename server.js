const express = require("express");
require("dotenv").config();
//generiert eine App

//distruction classe
const { MongoClient } = require("mongodb");
const { readPassword, writePassword } = require("./lib/passwords");
const { decrypt, encrypt } = require("./lib/crypto");
const bodyParser = require("body-parser");

const client = new MongoClient(process.env.MONGO_URI);
const masterPassword = "123";
const app = express();
app.use(bodyParser.json());

async function main() {
  await client.connect();

  const database = client.db(process.env.MONGO_DB_NAME);

  //die Methode legt den Endpunkt fest
  //:alles was hinter / steht wird unter name gespeichert
  app.get("/api/password/:name", async (request, response) => {
    const { name } = request.params;
    const encryptedPassword = await readPassword(name, database);
    const password = decrypt(encryptedPassword, masterPassword);
    response.send(password);
  });

  app.post("/api/passwords", async (request, response) => {
    console.log("POST a password");
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.send("Password created");
  });

  //höre auf folgenden port - listen
  app.listen(3000, function () {
    console.log("listening on 3000");
  });
}

main();
