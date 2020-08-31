const express = require("express");

function createUsersRouter() {
  const router = express.Router();

  router.post("/login", async (request, response) => {
    const { username } = request.body;
    console.log(username);
    response.send("Logged in");
  });

  return router;
}

module.exports = createUsersRouter;
