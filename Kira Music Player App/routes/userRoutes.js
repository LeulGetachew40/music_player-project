const express = require("express");
const userRouter = express.Router();
const usersControllers = require("./../controllers/usersControllers");
const authController = require("./../controllers/authControllers.js");

userRouter.post("/signup", usersControllers.createUser);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);
userRouter.get("/all", usersControllers.getAllUsers);

userRouter.get("/", (req, res, next) => {
  console.log(req.session.user, "11111111111111111111111111111111111");
  if (!req.session.user) {
    res.render("base");
  } else {
    res.status(200).render("profile");
  }
});
userRouter.use(authController.protectRoute);
userRouter.get("/:username/songs", usersControllers.getUserAllSongs);
userRouter.get("/:username", usersControllers.getHomePage);

module.exports = userRouter;
