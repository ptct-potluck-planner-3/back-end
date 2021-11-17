const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./users/users-router");
const eventsRouter = require("./events/events-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(`/api/users`, usersRouter);
server.use(`/api/events`, eventsRouter);

server.get("/", (req, res) => {
	res.json({ api: "API is UP!" });
});

module.exports = server;
