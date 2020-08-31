const express = require("express");

function createUsersRouter(database) {
  const router = express.Router();

  const usersCollection = database.collection("users");

  router.post("/login", async (request, response) => {
    try {
      const { username } = request.body;
      const user = await usersCollection.findOne({ username });
      if (!user) {
        response.status(401).send("Wrong username");
        return;
      }
      console.log(user);
      response.send("Logged in");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  return router;
}

module.exports = createUsersRouter;
