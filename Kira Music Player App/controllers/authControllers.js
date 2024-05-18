const AppError = require("../utils/apiError.js");
const User = require("./../models/usersModel.js");
const catchAsync = require("./../utils/catchAsync.js");
const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    return next(new AppError(400, "Please provide your username and password"));
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(new AppError(404, "User not Found"));
  }
  if (user.password !== password) {
    return next(new AppError(400, "Invalid username or password"));
  }

  req.session.user = user;
  console.log(req.session.user);
  req.session.isAuth = true;
  res.status(200).redirect(`./${user.username}`);
});

const protectRoute = catchAsync(async (req, res, next) => {
  let accessingUser;
  if (req.session.user) {
    accessingUser = await User.findOne({
      username: req.session.user.username,
    });
  }
  if (!accessingUser) {
    return next(new AppError(401, "User is logged out"));
  }
  req.user = accessingUser;
  next();
});

const logout = catchAsync(async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = { login, protectRoute, logout };
