// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Unable to retrieve user list.",
      error: err.message,
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user
      ? res.status(404).json({
          message: `No user found by id: ${req.params.id}`,
        })
      : res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Unable to retrieve specified user.",
      error: err.message,
    });
  }
});

module.exports = server;
