const express = require("express");
const userRouter = express.Router();
const usersControllers = require("./../controllers/usersControllers");
const authController = require("./../controllers/authControllers.js");
const musicController = require("./../controllers/musicControllers.js");

userRouter.get("/signup", usersControllers.createUser);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);

userRouter.get("/", authController.protectRoute, musicController.musicHomePage);

module.exports = userRouter;
