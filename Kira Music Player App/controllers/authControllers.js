const AppError = require("../utils/apiError.js");
const User = require("./../models/usersModel.js");
const catchAsync = require("./../utils/catchAsync.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// const signJwt = function (user, req) {
//   req.session.sessionId = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError(400, "Please provide your username and password"));
  }
  const user = await User.findOne({ username });
  if (user.password !== password) {
    return next(new AppError(400, "Invalid username or password"));
  }
  if (!user) {
    return next(new AppError(404, "User not Found"));
  }

  // signJwt(user, req);

  req.session.user = user;
  req.session.isAuth = true;
  res.status(200).redirect("/");
});

const protectRoute = catchAsync(async (req, res, next) => {
  let payload;
  console.log(req.session.sessionId);
  if (req.session.sessionId) {
    payload = await promisify(jwt.verify)(
      req.session.sessionId,
      process.env.JWT_SECRET
    );
  }
  const accessingUser = await User.findOne({ _id: payload.id });
  if (!accessingUser) {
    return next(
      new AppError(
        401,
        "The user belonging to this token doesn't exist anymore"
      )
    );
  }
  req.user = accessingUser;
  next();
});

const logout = catchAsync(async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = { login, protectRoute, logout };
