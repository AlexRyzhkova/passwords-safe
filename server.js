const express = require("express");
require("dotenv").config();
//generiert eine App

//distruction classe
const { MongoClient } = require("mongodb");
const { readPassword, writePassword } = require("./lib/passwords");
const { decrypt, encrypt } = require("./lib/crypto");
//Inhalt (body ) wird analysiert un dem wird ein Wert gegeben
const bodyParser = require("body-parser");

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});
const masterPassword = "123";
const app = express();
//app.use middelware- alle Anfrgaen werden zuerst in app.use bearbeitet( alle Ruten)
app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log(`Request ${request.method} on ${request.url}`);
  next();
});

async function main() {
  await client.connect();

  const database = client.db(process.env.MONGO_DB_NAME);

  //die Methode legt den Endpunkt fest
  //:alles was hinter / steht wird unter name gespeichert
  app.get("/api/passwords/:name", async (request, response) => {
    try {
      //params url
      const { name } = request.params;
      const encryptedPassword = await readPassword(name, database);
      if (!encryptedPassword) {
        response.status(404).send(`Password ${name} not found`);
        return;
      }
      const password = decrypt(encryptedPassword, masterPassword);
      response.send(password);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  app.post("/api/passwords", async (request, response) => {
    try {
      const { name, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      await writePassword(name, encryptedPassword, database);
      response.status(201).send(`Password ${name} created`);
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  //höre auf folgenden port - listen
  app.listen(3000, function () {
    console.log("listening on 3000");
  });
}

main();
