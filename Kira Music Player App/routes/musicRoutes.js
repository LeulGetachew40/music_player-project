const express = require("express");
const musicRouter = express.Router();
const musicControllers = require("./../controllers/musicControllers.js");

musicRouter.post("/", musicControllers.addMusic);

module.exports = musicRouter;
